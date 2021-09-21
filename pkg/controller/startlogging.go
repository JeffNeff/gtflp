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
