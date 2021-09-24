package controller

import (
	"context"
	"encoding/json"
	"net/http"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// FetchPodsHandler is a handler to return a list of pods in the current namespace
func (c *Controller) FetchPodsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	l, _ := c.k8sClient.Pods(c.namespace).List(context.TODO(), metav1.ListOptions{})
	var pods []string
	for _, pod := range l.Items {
		pods = append(pods, pod.Name)
	}
	json.NewEncoder(w).Encode(pods)
}

// FetchPodsInfo is a handler to return a list of pods in the current namespace
func (c *Controller) FetchVerbosePods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	l, _ := c.k8sClient.Pods(c.namespace).List(context.TODO(), metav1.ListOptions{})

	json.NewEncoder(w).Encode(l)
}
