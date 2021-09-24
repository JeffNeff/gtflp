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

// FetchKsvc is a handler to return a list of services in the current namespace
func (c *Controller) FetchKsvc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	resources := c.servingClient.ServingV1().Routes(c.namespace)
	x, err := resources.List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err)
	}

	var services []interface{}
	for _, y := range x.Items {
		services = append(services, y.Status.URL)
	}
	json.NewEncoder(w).Encode(services)
}

// FetchVerboseKsvc is a handler to return a verbose list of services in the current namespace
func (c *Controller) FetchVerboseKsvc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	resources := c.servingClient.ServingV1().Routes(c.namespace)
	x, err := resources.List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(x)
}
