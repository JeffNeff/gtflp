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
import LogCard from "./components/LogCard";
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Button } from "@material-ui/core";

function LogContainer() {
  const [messages, setMessages] = useState([]);
  const [podNames, setPodNames] = useState([]);
  const [logsize, setLogsize] = useState(15);

  useEffect(() => {
    console.log("Protocol: " + window.location.protocol);
    let wsURL = "ws://" + document.location.host + "/lws";
    if (window.location.protocol === "https:") {
      wsURL = "wss://" + document.location.host + "/lws";
    }

    // wsURL = "ws://localhost:8080/lws"

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

      if (podNames.includes(t.pod) == false) {
        setPodNames(podNames.concat(t.pod));
      }

      setMessages(messages.concat(t.pod + " : " + t.message));
    };
    return () => {
      sock.close();
    };
  });

  return (
    <Container>
      <h3 className="page-title">Log Scanner:</h3>
      <h5> Load new pod logs from running resources in the namespace </h5>
      <Row>
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
        <LogCard messages={messages} podNames={podNames} logsize={logsize} />
      </Row>
    </Container>
  );
}

export default LogContainer;
