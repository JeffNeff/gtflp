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

import React, { useState, useEffect } from "react";
import { Button, Container, Row } from "reactstrap";
import InjectionPod from "./components/Injection";
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";

function Injection() {
  const corsOptions = {
    origin: "*",
  };

  function fetchServices() {
    axios
      .post("/queryservices", {}, corsOptions)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [services, setServices] = useState([]);
  fetchServices();
  return (
    <Container>
      <h3 className="page-title">Cloudevent Injection:</h3>
      <h5> Inject Cloudevents into the namespace </h5>

      <Row>
        <InjectionPod destinations={services} />
      </Row>
    </Container>
  );
}

export default Injection;
