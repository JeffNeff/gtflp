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
import { Container, Row } from "reactstrap";
import { Button } from "@material-ui/core";
import { Card, CardBody, Col } from "reactstrap";
import InjectionPod from "./components/Injection";

import ReconnectingWebSocket from "reconnecting-websocket";
import JSONPretty from "react-json-pretty";
import { Heading } from "grommet";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

function Injection() {
  const [events, setEvents] = React.useState([]);
  const [logsize, setLogsize] = React.useState(10);

  const corsOptions = {
    origin: "*",
  };



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
    <Container >
      <h3 className="page-title">Cloudevent Injection:</h3>
      <h5> Inject Cloudevents into the namespace </h5>
            <Button
          label="-"
          onClick={() => {
            setLogsize(logsize - 5);
          }}
        >
          -
        </Button>
        <Button
          label="+"
          onClick={() => {
            setLogsize(logsize + 5);
          }}
        >
          +
        </Button>
      <Row >
        <InjectionPod destinations={services}  />
        <Row></Row>
      </Row>
      <Row>
        {events.map((event, index) => {
          return (
            <Col md={12}>
              <Card>
                <CardBody>
                  <div key={index}>
                    <Row>
                      <JSONPretty style={{fontSize: logsize}}  json={event} theme={JSONPrettyMon} />
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Injection;
