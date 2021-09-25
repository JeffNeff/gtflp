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
import ReconnectingWebSocket from "reconnecting-websocket";
import { Button, Select, MenuItem } from "@material-ui/core";
import createPersistedState from "use-persisted-state";
const useCounterState = createPersistedState("count");
const useStringState = createPersistedState("string");
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var JSONPretty1337 = require("react-json-pretty/dist/1337");
var JSONPrettyAcai = require("react-json-pretty/dist/acai");
var JSONPrettyAdv = require("react-json-pretty/dist/adventure_time");


function LogContainer() {
  const [messages, setMessages] = useState([]);
  const [podNames, setPodNames] = useState([]);
  const [logsize, setLogsize] = useCounterState(10);
  const [themeClassName, setThemeClassName] = useStringState(JSONPrettyMon);

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
      Theme: 
      <Select
        value={themeClassName}
        onChange={(e) => setThemeClassName(e.target.value)}
      >
        <MenuItem value={JSONPrettyMon}>PrettyMon</MenuItem>
        <MenuItem value={JSONPretty1337}>1337</MenuItem>
        <MenuItem value={JSONPrettyAcai}>acai</MenuItem>
        <MenuItem value={JSONPrettyAdv}>adv</MenuItem>
      </Select>
      <Row>
        <LogCard messages={messages} podNames={podNames} logsize={logsize} theme={themeClassName}/>
      </Row>
    </Container>
  );
}

export default LogContainer;
