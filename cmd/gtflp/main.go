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
	"fmt"
	"os"

	"github.com/gorilla/websocket"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	x := Controller{}
	var err error
	if os.Getenv("DEV") == "" {
		x.Namespace, err = ReturnNamespace()
		if err != nil {
			fmt.Printf("Error fetching namespace: %v", err)
		}

		config, err := rest.InClusterConfig()
		if err != nil {
			fmt.Println("error in getting config")
		}
		clientset, err := kubernetes.NewForConfig(config)
		if err != nil {
			fmt.Println("error in getting access to K8S")
		}

		c.StartLoggingHandler()

	} else {
		x.Namespace = os.Getenv("NAMESPACE")
		x.k8sClient, err = GetClient()
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
		}
	}

	if x.Namespace == "" {
		fmt.Println("No namespace specified")
	}

	x.Start()
}

// for {
// 	// if x.Ws == nil {
// 	// 	break
// 	// }

// 	// var message Message
// 	// err := x.Ws.ReadJSON(&message)
// 	// if !errors.Is(err, nil) {
// 	// 	log.Printf("error occurred: %v", err)
// 	// 	break
// 	// }
// 	// log.Println(message)
