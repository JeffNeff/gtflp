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
	"log"
	"net/http"
	"path"
	"strings"

	"github.com/JeffNeff/gtflp/pkg/controller"
	cloudevents "github.com/cloudevents/sdk-go/v2"
	"github.com/kelseyhightower/envconfig"
)

type envConfig struct {
	DataPath string `envconfig:"KO_DATA_PATH" default:"/var/run/ko/" required:"true"`
	WWWPath  string `envconfig:"WWW_PATH" default:"www" required:"true"`
	Port     int    `envconfig:"PORT" default:"8082" required:"true"`
	// TODO: Make self aware of the cluster namespace
	ClusterName string `envconfig:"CLUSTER_NAME" default:"chart-testing" required:"false"`
	Namespace   string `envconfig:"NAMESPACE" required:"false"`
	User        string `envconfig:"USER" required:"false"`
}

func main() {
	var env envConfig
	if err := envconfig.Process("", &env); err != nil {
		log.Fatalf("failed to process env var: %s", err)
	}

	www := path.Join(env.DataPath)
	if !strings.HasSuffix(www, "/") {
		www = www + "/"
	}

	c := controller.New(www, "/Users/"+env.User+"/.kube/config", env.ClusterName)

	t, err := cloudevents.NewHTTP(
		cloudevents.WithPath("/ce"), // hack hack
	)
	if err != nil {
		log.Fatalf("failed to create cloudevents transport, %s", err.Error())
	}
	// I am doing this to allow root to be both POST for cloudevents and GET as root ui.
	c.Mux().HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			t.ServeHTTP(w, r)
			return
		}
		c.RootHandler(w, r)
	})
	t.Handler = c.Mux()

	c.Mux().HandleFunc("/inject", func(w http.ResponseWriter, r *http.Request) {
		c.InjectionHandler(w, r)
	})

	c.Mux().HandleFunc("/queryservices", func(w http.ResponseWriter, r *http.Request) {
		c.QueryServicesHandler(w, r)
	})

	c.Mux().HandleFunc("/fetchPods", func(w http.ResponseWriter, r *http.Request) {
		c.FetchPodsHandler(w, r)
	})

	c.Mux().HandleFunc("/fetchVerbosePods", func(w http.ResponseWriter, r *http.Request) {
		c.FetchVerbosePods(w, r)
	})

	c.Mux().HandleFunc("/fetchKsvc", func(w http.ResponseWriter, r *http.Request) {
		c.FetchKsvc(w, r)
	})

	c.Mux().HandleFunc("/fetchVerboseKsvc", func(w http.ResponseWriter, r *http.Request) {
		c.FetchVerboseKsvc(w, r)
	})

	c.Mux().HandleFunc("/fetchBrokers", func(w http.ResponseWriter, r *http.Request) {
		c.FetchBrokers(w, r)
	})

	c.Mux().HandleFunc("/fetchVerboseBrokers", func(w http.ResponseWriter, r *http.Request) {
		c.FetchVerboseBrokers(w, r)
	})

	c.Mux().HandleFunc("/fetchTriggers", func(w http.ResponseWriter, r *http.Request) {
		c.FetchTriggers(w, r)
	})

	c.Mux().HandleFunc("/fetchVerboseTriggers", func(w http.ResponseWriter, r *http.Request) {
		c.FetchVerboseTriggers(w, r)
	})

	c.Mux().HandleFunc("/fetchBridges", func(w http.ResponseWriter, r *http.Request) {
		c.FetchBridges(w, r)
	})

	c.Mux().HandleFunc("/fetchVerboseBridges", func(w http.ResponseWriter, r *http.Request) {
		c.FetchVerboseBridges(w, r)
	})

	c.StartLoggingHandler()

	ce, err := cloudevents.NewClient(t, cloudevents.WithUUIDs(), cloudevents.WithTimeNow())
	if err != nil {
		log.Fatalf("failed to create cloudevents client, %s", err.Error())
	}

	log.Printf("Server starting on port 8080\n")
	if err := ce.StartReceiver(context.Background(), c.CeHandler); err != nil {
		log.Fatalf("failed to start cloudevent receiver, %s", err.Error())
	}

}
