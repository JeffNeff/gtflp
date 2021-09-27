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
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
	"time"

	cloudevents "github.com/cloudevents/sdk-go/v2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

var once sync.Once

func (c *Controller) RootHandler(w http.ResponseWriter, r *http.Request) {
	once.Do(func() {
		c.rootHandler = http.FileServer(http.Dir(c.root))
	})

	c.rootHandler.ServeHTTP(w, r)
}

// FetchPodsHandler is a handler to return a list of pods in the current namespace
func (c *Controller) FetchPodsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	l, err := c.k8sClient.Pods(c.namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Pods, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Pods, %v", err))
		return
	}
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
	l, err := c.k8sClient.Pods(c.namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Pods, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Pods, %v", err))
		return
	}

	json.NewEncoder(w).Encode(l)
}

// FetchKsvc is a handler to return a list of services in the current namespace
func (c *Controller) FetchKsvc(w http.ResponseWriter, r *http.Request) {
	var services []interface{}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	resources := c.servingClient.ServingV1().Routes(c.namespace)
	x, err := resources.List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Services, %v", err))
		return
	}

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
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Services, %v", err))
		return
	}

	json.NewEncoder(w).Encode(x)
}

// FetchBrokers is a handler to return a list of brokers in the current namespace
func (c *Controller) FetchBrokers(w http.ResponseWriter, r *http.Request) {
	var brokers []interface{}
	gvr := schema.GroupVersionResource{
		Group:    "eventing.knative.dev",
		Version:  "v1",
		Resource: "brokers",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Brokers, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Brokers, %v", err))
		return

	}

	for _, item := range list.Items {
		x := "http://broker-ingress.knative-eventing.svc.cluster.local/" + c.namespace + "/" + item.GetName()
		brokers = append(brokers, x)
	}
	json.NewEncoder(w).Encode(brokers)
}

// FetchVerboseBrokers is a handler to return a list of information about brokers in the current namespace
func (c *Controller) FetchVerboseBrokers(w http.ResponseWriter, r *http.Request) {
	gvr := schema.GroupVersionResource{
		Group:    "eventing.knative.dev",
		Version:  "v1",
		Resource: "brokers",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Brokers, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Brokers, %v", err))
		return
	}

	json.NewEncoder(w).Encode(list)
}

// FetchTriggers is a handler to return a list of triggers in the current namespace
func (c *Controller) FetchTriggers(w http.ResponseWriter, r *http.Request) {
	var triggers []interface{}
	gvr := schema.GroupVersionResource{
		Group:    "eventing.knative.dev",
		Version:  "v1",
		Resource: "triggers",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Triggers, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Triggers, %v", err))
		return
	}

	for _, item := range list.Items {
		triggers = append(triggers, item.GetName())
	}
	json.NewEncoder(w).Encode(triggers)
}

// FetchVerboseTriggers is a handler to return a list of triggers in the current namespace
func (c *Controller) FetchVerboseTriggers(w http.ResponseWriter, r *http.Request) {
	gvr := schema.GroupVersionResource{
		Group:    "eventing.knative.dev",
		Version:  "v1",
		Resource: "triggers",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Triggers, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Triggers, %v", err))
		return
	}

	json.NewEncoder(w).Encode(list)
}

// FetchBridges is a handler to return a list of Bridges in the current namespace
func (c *Controller) FetchBridges(w http.ResponseWriter, r *http.Request) {
	var bridge []interface{}
	gvr := schema.GroupVersionResource{
		Group:    "flow.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "bridges",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Bridges, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Bridges, %v", err))
		return
	}

	for _, item := range list.Items {
		bridge = append(bridge, item.GetName())
	}
	json.NewEncoder(w).Encode(bridge)
}

// FetchVerboseBridges is a handler to return info about Bridges in the current namespace
func (c *Controller) FetchVerboseBridges(w http.ResponseWriter, r *http.Request) {
	gvr := schema.GroupVersionResource{
		Group:    "flow.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "bridges",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Bridges, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Bridges, %v", err))
		return
	}

	json.NewEncoder(w).Encode(list)
}

// FetchSources is a handler to return a list of Sources in the current namespace
func (c *Controller) FetchSources(w http.ResponseWriter, r *http.Request) {
	var source []interface{}
	gvr := schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureactivitylogssources",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List azureactivitylogssources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureactivitylogssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "twiliosources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List twiliosources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureblobstoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureblobstoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "azureeventgridsources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureeventgridsources, %v", err))
	// 	return
	// }

	// for _, item := range list.Items {
	// 	source = append(source, item.GetName())
	// }

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureeventhubsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureeventhubsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azurequeuestoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azurequeuestoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "googlecloudauditlogssources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudauditlogssources, %v", err))
	// 	return
	// }
	// for _, item := range list.Items {
	// 	source = append(source, item.GetName())
	// }

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "googlecloudbillingsources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudbillingsources, %v", err))
	// 	return
	// }

	// for _, item := range list.Items {
	// 	source = append(source, item.GetName())
	// }

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "googlecloudpubsubsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudpubsubsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "googlecloudstoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudstoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "ocimetricssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List ocimetricssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "salesforcesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List salesforcesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "httppollersources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List httppollersources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "slacksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List slacksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "webhooksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List webhooksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "zendesksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List zendesksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscloudwatchsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscloudwatchsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscloudwatchlogssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscloudwatchlogssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscodecommitsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscodecommitsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscognitoidentitysources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitoidentitysources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscognitouserpoolsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitouserpoolsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awsdynamodbsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitouserpoolsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awskinesissources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awskinesissources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awsperformanceinsightssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awsperformanceinsightssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awss3sources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awsperformanceinsightssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awssnssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awssnssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awssqssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awssqssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	json.NewEncoder(w).Encode(source)
}

// FetchVerboseSources is a handler to return info about Sources in the current namespace
func (c *Controller) FetchVerboseSources(w http.ResponseWriter, r *http.Request) {
	var source []interface{}
	gvr := schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureactivitylogssources",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List azureactivitylogssources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureactivitylogssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "twiliosources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List twiliosources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureblobstoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureblobstoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "azureeventgridsources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureeventgridsources, %v", err))
	// 	return
	// }

	// for _, item := range list.Items {
	// 	source = append(source, item)
	// }

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azureeventhubsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azureeventhubsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "azurequeuestoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List azurequeuestoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "googlecloudauditlogssources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudauditlogssources, %v", err))
	// 	return
	// }
	// for _, item := range list.Items {
	// 	source = append(source, item)
	// }

	// list = nil
	// gvr = schema.GroupVersionResource{
	// 	Group:    "sources.triggermesh.io",
	// 	Version:  "v1alpha1",
	// 	Resource: "googlecloudbillingsources",
	// }

	// list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	// if err != nil {
	// 	fmt.Println("Failed to List Sources, %v", err)
	// 	json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudbillingsources, %v", err))
	// 	return
	// }

	// for _, item := range list.Items {
	// 	source = append(source, item)
	// }

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "googlecloudpubsubsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudpubsubsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "googlecloudstoragesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List googlecloudstoragesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "ocimetricssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List ocimetricssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "salesforcesources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List salesforcesources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "httppollersources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List httppollersources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "slacksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List slacksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "webhooksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List webhooksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "zendesksources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List zendesksources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscloudwatchsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscloudwatchsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscloudwatchlogssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscloudwatchlogssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscodecommitsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscodecommitsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscognitoidentitysources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitoidentitysources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awscognitouserpoolsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitouserpoolsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awsdynamodbsources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awscognitouserpoolsources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awskinesissources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awskinesissources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awsperformanceinsightssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awsperformanceinsightssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awss3sources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awsperformanceinsightssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awssnssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awssnssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item)
	}

	list = nil
	gvr = schema.GroupVersionResource{
		Group:    "sources.triggermesh.io",
		Version:  "v1alpha1",
		Resource: "awssqssources",
	}

	list, err = c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Sources, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List awssqssources, %v", err))
		return
	}

	for _, item := range list.Items {
		source = append(source, item.GetName())
	}

	json.NewEncoder(w).Encode(source)
}

func (c *Controller) InjectionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// json.NewEncoder(w).Encode("OKOK")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("Error occured reading body: %v", err)
		json.NewEncoder(w).Encode("Failure reding request")
		return
	}
	ip := &injectionPayload{}
	if err := json.Unmarshal(body, ip); err != nil {
		fmt.Println("Error occured unmarsaling data: %v", err)
		json.NewEncoder(w).Encode("Failure unmarshaling request")
		return
	}

	eventToSend := cloudevents.NewEvent()
	var jsonMap map[string]interface{}
	json.Unmarshal([]byte(ip.Data), &jsonMap)
	if err != nil {
		fmt.Println("Error occured marshaling data: %v", err)
		json.NewEncoder(w).Encode("Failure marshaling data")
		return
	}

	eventToSend.SetType(ip.Headers.CeType)
	eventToSend.SetSource(ip.Headers.CeSource)
	eventToSend.SetID(ip.Headers.CeID)
	eventToSend.SetDataContentType(ip.Headers.ContentType)
	eventToSend.SetData(cloudevents.ApplicationJSON, jsonMap)

	ctx := cloudevents.ContextWithTarget(context.Background(), ip.Destination)
	result := c.ceClient.Send(ctx, eventToSend)

	fmt.Println("sent Event to: %v", ip.Destination)
	fmt.Println("")
	fmt.Println(eventToSend)
	json.NewEncoder(w).Encode(result)
}

// FetchCGVR is a handler to return a list of  about a provided GVR in the current namespace
func (c *Controller) FetchCGVR(w http.ResponseWriter, r *http.Request) {
	var cgvrResponse []interface{}
	cgvr := &CGVRpayload{}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("Error occured reading body: %v", err)
		json.NewEncoder(w).Encode("Failure reding request")
		return
	}

	if err := json.Unmarshal(body, cgvr); err != nil {
		fmt.Println("Error occured unmarsaling data: %v", err)
		json.NewEncoder(w).Encode("Failure unmarshaling request")
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    cgvr.Group,
		Version:  cgvr.Version,
		Resource: cgvr.Resource,
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List CGVR, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Custom GVR: , %v", err))
		return
	}

	for _, item := range list.Items {
		cgvrResponse = append(cgvrResponse, item.GetName())
	}

	json.NewEncoder(w).Encode(cgvrResponse)
}

// FetchVerboseCGVR is a handler to return a detailed list of items about a provided GVR in the current namespace
func (c *Controller) FetchVerboseCGVR(w http.ResponseWriter, r *http.Request) {
	cgvr := &CGVRpayload{}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("Error occured reading body: %v", err)
		json.NewEncoder(w).Encode("Failure reding request")
		return
	}

	if err := json.Unmarshal(body, cgvr); err != nil {
		fmt.Println("Error occured unmarsaling data: %v", err)
		json.NewEncoder(w).Encode("Failure unmarshaling request")
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    cgvr.Group,
		Version:  cgvr.Version,
		Resource: cgvr.Resource,
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.Background(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List VerboseCGVR, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Custom GVR: , %v", err))
		return
	}

	json.NewEncoder(w).Encode(list)
}

// QueryServicesHandler is a handler to return a list of services in the current namespace
func (c *Controller) QueryServicesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	resources := c.servingClient.ServingV1().Routes(c.namespace)
	x, err := resources.List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Services, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Services, %v", err))
		return
	}

	var services []interface{}
	for _, y := range x.Items {
		services = append(services, y.Status.URL)
	}

	gvr := schema.GroupVersionResource{
		Group:    "eventing.knative.dev",
		Version:  "v1",
		Resource: "brokers",
	}

	list, err := c.dC.Resource(gvr).Namespace(c.namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		fmt.Println("Failed to List Brokers, %v", err)
		json.NewEncoder(w).Encode(fmt.Sprintf("Failed to List Brokers, %v", err))
		return
	}

	for _, item := range list.Items {
		x := "http://broker-ingress.knative-eventing.svc.cluster.local/" + c.namespace + "/" + item.GetName()
		services = append(services, x)
	}

	json.NewEncoder(w).Encode(services)
}

func (c *Controller) StartLoggingHandler() {
	listOptions := metav1.ListOptions{}
	go func() {
		for {
			pds, err := c.k8sClient.Pods(c.namespace).List(context.TODO(), listOptions)
			if err != nil {
				panic(err)
			}
			for _, pod := range pds.Items {
				msg := c.GetPodLogs(c.namespace, pod.Name, pod.Spec.Containers[0].Name, true)
				if !ContainsLogs(c.oldLogs, msg.Message) {
					manager.send(msg)
					c.oldLogs = append(c.oldLogs, msg.Message)
				}
				time.Sleep(time.Second * 2)
			}
			time.Sleep(time.Second * 3)
		}
	}()
}

func (c *Controller) CeHandler(event cloudevents.Event) {
	fmt.Println("got", event.String())
	b, err := json.Marshal(event)
	if err != nil {
		fmt.Println("err", err)
		return
	}

	manager.broadcast <- string(b)
}

func ContainsLogs(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}
