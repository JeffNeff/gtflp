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
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"

	cloudevents "github.com/cloudevents/sdk-go/v2"
	v1 "k8s.io/api/core/v1"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
	typev1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	servingclientset "knative.dev/serving/pkg/client/clientset/versioned"

	"golang.org/x/net/websocket"
)

type Controller struct {
	ceClient      cloudevents.Client
	rootHandler   http.Handler
	root          string
	mux           *http.ServeMux
	once          sync.Once
	namespace     string
	servingClient *servingclientset.Clientset
	dC            dynamic.Interface
	k8sClient     typev1.CoreV1Interface
	oldLogs       []string
}

type Message struct {
	Message string `json:"message"`
	Pod     string `json:"pod"`
}

func New(root, kubeConfigLocation, cluster string) *Controller {
	ceClient, err := cloudevents.NewClientHTTP()
	if err != nil {
		fmt.Printf("failed to create client, %v", err)
	}

	namespace, err := returnNamespace()
	if err != nil {
		fmt.Printf("Error fetching namespace: %v", err)
	}

	// dev
	namespace = "midimansland"

	config, err := BuildClientConfig(kubeConfigLocation, cluster)
	if err != nil {
		fmt.Printf("Error building kube client: %v", err)
	}

	servingClient := servingclientset.NewForConfigOrDie(config)
	dc := dynamic.NewForConfigOrDie(config)
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		fmt.Println("error in getting access to K8S")
	}

	return &Controller{
		root:          root,
		ceClient:      ceClient,
		namespace:     namespace,
		servingClient: servingClient,
		dC:            dc,
		k8sClient:     clientset.CoreV1(),
	}
}

func (c *Controller) Mux() *http.ServeMux {
	c.once.Do(func() {
		m := http.NewServeMux()
		m.HandleFunc("/ui", c.RootHandler)
		m.Handle("/ws", websocket.Handler(c.WSHandler))
		m.Handle("/lws", websocket.Handler(c.LogsWSHandler))
		c.mux = m
	})
	return c.mux
}

func returnNamespace() (string, error) {
	dat, err := os.ReadFile("/var/run/secrets/kubernetes.io/serviceaccount/namespace")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return "", err
	}
	s := string(dat)
	return s, nil
}

// BuildClientConfig builds the client config specified by the config path and the cluster name
func BuildClientConfig(kubeConfigPath string, clusterName string) (*rest.Config, error) {
	if cfg, err := clientcmd.BuildConfigFromFlags("", ""); err == nil {
		// success!
		return cfg, nil
	}
	// try local...

	overrides := clientcmd.ConfigOverrides{}
	// Override the cluster name if provided.
	if clusterName != "" {
		overrides.Context.Cluster = clusterName
	}

	return clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		&clientcmd.ClientConfigLoadingRules{ExplicitPath: kubeConfigPath},
		&overrides).ClientConfig()
}

func (c *Controller) GetPodLogs(namespace string, podName string, containerName string, follow bool) Message {
	msg := &Message{}
	count := int64(500)
	podLogOptions := v1.PodLogOptions{
		Container: containerName,
		TailLines: &count,
	}
	podLogRequest := c.k8sClient.
		Pods(c.namespace).
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
