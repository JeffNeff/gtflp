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
	"encoding/json"
	"fmt"

	cloudevents "github.com/cloudevents/sdk-go/v2"
)

func (c *Controller) CeHandler(event cloudevents.Event) {
	fmt.Println("got", event.String())

	// TODO: cloudevents needs a websocket transport.

	b, err := json.Marshal(event)
	if err != nil {
		fmt.Println("err", err)
		return
	}

	manager.broadcast <- string(b)

}
