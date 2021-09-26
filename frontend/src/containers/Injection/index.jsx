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
import { Button, Select, MenuItem} from "@material-ui/core";
import { Card, CardBody, Col } from "reactstrap";
import InjectionPod from "./components/Injection";
import createPersistedState from "use-persisted-state";
const useArrayState = createPersistedState("array");
const useCountertate = createPersistedState("counter");
const useStringState = createPersistedState("string");
import ReconnectingWebSocket from "reconnecting-websocket";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var JSONPretty1337 = require("react-json-pretty/dist/1337");
var JSONPrettyAcai = require("react-json-pretty/dist/acai");
var JSONPrettyAdv = require("react-json-pretty/dist/adventure_time");

function Injection() {
  const [events, setEvents] = useArrayState([]);
  const [logsize, setLogsize] = useCountertate(10);
  const [themeClassName, setThemeClassName] = useStringState(JSONPrettyMon);

  return (
    <Container>
      <h3 className="page-title">Cloudevents:</h3>
      <h5> Monitor and inject Cloudevents here! </h5>
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
      <Button
        label="Clear Events"
        onClick={() => {
          setEvents([]);
        }}
      >
        Clear Events
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
      <Row style={{ paddingLeft: 20 }}>
        <InjectionPod />
        <Row></Row>
      </Row>
      <Row>
        {events.map((event, index) => {
          return (
            <Col md={12}>
              <Card>
                <CardBody>
                  <div key={index}>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <JSONPretty
                        style={{ fontSize: logsize }}
                        json={event}
                        theme={themeClassName}
                      />
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
