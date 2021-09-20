// Copyright [2021] [Jeff Naef]

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	typev1 "k8s.io/client-go/kubernetes/typed/core/v1"
)

type Controller struct {
	Ws        *websocket.Conn
	Db        *sql.DB
	k8sClient typev1.CoreV1Interface

	Namespace string
	oldLogs   []string
}

func (x *Controller) Start() {
	listOptions := metav1.ListOptions{}

	e := echo.New()
	kdp := os.Getenv("KO_DATA_PATH")
	e.Static("/", kdp)
	e.Static("/pages/one", kdp)
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/wsclose", func(c echo.Context) error {
		fmt.Println("closing WS connection..")
		err := x.Ws.Close()
		if err != nil {
			fmt.Println(err)
			return err
		}
		x.Ws = nil
		x.oldLogs = nil
		return nil
	})

	e.GET("/ws", func(c echo.Context) error {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }

		var err error
		x.Ws, err = upgrader.Upgrade(c.Response().Writer, c.Request(), nil)
		if !errors.Is(err, nil) {
			log.Println(err)
		}
		return nil
	})

	go func() {
		for {
			pds, err := x.k8sClient.Pods(x.Namespace).List(context.TODO(), listOptions)
			if err != nil {
				log.Fatal(err)
			}
			for _, pod := range pds.Items {
				if x.Ws == nil {
					break
				}

				msg := x.GetPodLogs(x.Namespace, pod.Name, pod.Spec.Containers[0].Name, true)
				if !ContainsLogs(x.oldLogs, msg.Message) {
					err := x.Ws.WriteJSON(msg)
					if err != nil {
						fmt.Printf("error occurred writing json to webhook: %v", err)
					}

					x.oldLogs = append(x.oldLogs, msg.Message)
				}
				time.Sleep(time.Second * 2)
			}
			time.Sleep(time.Second * 3)
		}
	}()

	e.Logger.Fatal(e.Start(":8080"))
}

func (x *Controller) GetPodLogs(namespace string, podName string, containerName string, follow bool) Message {
	msg := &Message{}
	count := int64(500)
	podLogOptions := v1.PodLogOptions{
		Container: containerName,
		TailLines: &count,
	}

	podLogRequest := x.k8sClient.
		Pods(x.Namespace).
		GetLogs(podName, &podLogOptions)
	stream, err := podLogRequest.Stream(context.TODO())
	if err != nil {
		msg = &Message{
			Message: string(fmt.Sprintf("pod stream error: %v", err)),
			Pod:     podName,
		}
		fmt.Printf("pod stream error: %v", err)
		return *msg

	}
	defer stream.Close()

	buf := make([]byte, 8000)
	numBytes, err := stream.Read(buf)
	if err == io.EOF {
		return *msg
	}
	if err != nil {
		fmt.Println(err)
	}
	msg = &Message{
		Message: string(buf[:numBytes]),
		Pod:     podName,
	}

	return *msg
}
