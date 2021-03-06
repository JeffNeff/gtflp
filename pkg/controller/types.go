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

type injectionPayload struct {
	Data        string `json:"data"`
	Destination string `json:"destination"`
	Headers     struct {
		CeID          string `json:"Ce-Id"`
		CeSpecversion string `json:"Ce-Specversion"`
		CeType        string `json:"Ce-Type"`
		CeSource      string `json:"Ce-Source"`
		ContentType   string `json:"Content-Type"`
	} `json:"headers"`
}

type CGVRpayload struct {
	Group    string `json:"group"`
	Version  string `json:"version"`
	Resource string `json:"resource"`
}
