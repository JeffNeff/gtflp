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

package controller

import (
	"context"
	"log"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c *Controller) StartLoggingHandler() {
	listOptions := metav1.ListOptions{}
	go func() {
		for {
			pds, err := c.k8sClient.Pods(c.namespace).List(context.TODO(), listOptions)
			if err != nil {
				log.Fatal(err)
			}
			for _, pod := range pds.Items {

				msg := c.GetPodLogs(c.namespace, pod.Name, pod.Spec.Containers[0].Name, true)
				if !ContainsLogs(c.oldLogs, msg.Message) {
					// err := .Ws.WriteJSON(msg)
					// if err != nil {
					// 	fmt.Printf("error occurred writing json to webhook: %v", err)
					// }
					logsManager.send(msg)

					c.oldLogs = append(c.oldLogs, msg.Message)
				}
				time.Sleep(time.Second * 2)
			}
			time.Sleep(time.Second * 3)
		}
	}()
}

func ContainsLogs(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}
