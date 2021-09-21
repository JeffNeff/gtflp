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
import JSONPretty from "react-json-pretty";
import { Heading } from "grommet";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

function Injection() {
  const [events, setEvents] = React.useState([]);

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

  useEffect(() => {
    // this is not working
    window.addEventListener("beforeunload", (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      onClose();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    });

    console.log("Protocol: " + window.location.protocol);
    let wsURL = "ws://" + document.location.host + "/ws";

    if (window.location.protocol === "https:") {
      wsURL = "wss://" + document.location.host + "/ws";
    }

    console.log("WS URL: " + wsURL);
    let sock = new ReconnectingWebSocket(wsURL);
    sock.onopen = function () {
      console.log("connected to " + wsURL);
    };
    sock.onclose = function (e) {
      console.log("connection closed (" + e.code + ")");
    };
    // Where we get the messages from the server
    sock.onmessage = function (e) {
      let t = JSON.parse(e.data);
      console.log(t);

      setEvents(events.concat(t));
    };
    return () => {
      sock.close();
    };
  });

  const [services, setServices] = useState([]);

  return (
    <Container>
      <h3 className="page-title">Cloudevent Injection:</h3>
      <h5> Inject Cloudevents into the namespace </h5>

      <Row>
        <InjectionPod destinations={services} />
        <Button style={{height:40, width:200 , marginTop:220 }} onClick={fetchServices}>Refresh Destinations</Button>
        <Row>
         
        </Row>
      </Row>
      <Row>
        {events.map((event, index) => {
          return (
            <div key={index}>
              <JSONPretty json={event} theme={JSONPrettyMon} />
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default Injection;