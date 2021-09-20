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
import {  Container, Row } from "reactstrap";
import LogCard from "./components/LogCard";
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";

function LogContainer() {
  const [messages, setMessages] = useState([]);
  const [podNames, setPodNames] = useState([]);

  // this is not working
  const onClose = () => {
    console.log("CLOSING");
    axios
      .post("/wsclose", {}, corsOptions)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

      if (podNames.includes(t.pod) == false) {
        setPodNames(podNames.concat(t.pod));
        console.log(podNames);
      }

      setMessages(messages.concat(t.pod + " : " + t.message));

    };
    return () => {
      sock.close();
    };
  });

  return (
    <Container >
      <h3 className="page-title">Log Scanner:</h3>
      <h5> Load new pod logs from running resources in the namespace </h5>
      <Row>
        {/* {podNames.map((podName) => {
            if (podNames.length > 0) {
            // location = podNames.indexOf(podName);
            <LogCard messages={messages} podName={podName} podNames={podNames} />
            }
          })} */}
        <LogCard messages={messages} podNames={podNames} />
      </Row>
    </Container>
  );
}

export default LogContainer;
