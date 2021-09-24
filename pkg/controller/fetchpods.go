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
