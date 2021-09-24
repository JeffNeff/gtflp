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

import React, { useEffect } from "react";
import createPersistedState from "use-persisted-state";
const useCounterState = createPersistedState("count");
import { Container, Row } from "reactstrap";
import { Card, CardBody, Col } from "reactstrap";
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
import { Button } from "@material-ui/core";

function EventViewer() {
  const [events, setEvents] = useCounterState([]);
  const [logsize, setLogsize] = useCounterState(10);

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

    wsURL = "ws://localhost:8080/ws";

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

  return (
    <Container>
      <h3 className="page-title">Event Viewer:</h3>
      <h5> View Cloudevents here! </h5>
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
      {events.map((event, index) => {
        return (
          <Col md={12}>
            <Card>
              <CardBody>
                <div key={index}>
                  <Row>
                    <JSONPretty
                      style={{ fontSize: logsize }}
                      json={event}
                      theme={JSONPrettyMon}
                    />
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Container>
  );
}

export default EventViewer;
