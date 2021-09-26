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

import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import {
  Button,
  Select,
  MenuItem,
  TextField,
  TableRow,
  FormControl,
  TableBody,
} from "@material-ui/core";
import axios from "axios";
import { TextArea } from "grommet";
import { Card, CardBody, Col } from "reactstrap";
import createPersistedState from "use-persisted-state";
import JSONPretty from "react-json-pretty";
const useArrayState = createPersistedState("array");
const useCountertate = createPersistedState("counter");
const useStringState = createPersistedState("string");
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var JSONPretty1337 = require("react-json-pretty/dist/1337");
var JSONPrettyAcai = require("react-json-pretty/dist/acai");
var JSONPrettyAdv = require("react-json-pretty/dist/adventure_time");

function Injection() {
  const [services, setServices] = useState([]);
  const [events, setEvents] = useArrayState([]);
  const [logsize, setLogsize] = useCountertate(10);
  const [themeClassName, setThemeClassName] = useStringState(JSONPrettyMon);
  const [id, setID] = React.useState("0123211");
  const [type, setType] = React.useState("test.type");
  const [source, setSource] = React.useState("test.source");
  const [contenttype, setContenttype] = React.useState("application/json");
  const [data, setData] = React.useState('{"test":"data"}');
  const [destination, setDestination] = React.useState();
  const corsOptions = {
    origin: "*",
  };
  
  const onClickFocus = (e) => {
    const it = JSON.parse(e.target.innerText);
    setID(it.id);
    setType(it.type)
    setSource(it.source)
    setContenttype(it.contenttype)
    setData(JSON.stringify(it.data))
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


  const handleInjection = (event) => {
    axios
      .post(
        "/inject",
        {
          destination,
          data,
          headers: {
            "Ce-Id": id,
            "Ce-Specversion": "1.0",
            "Ce-Type": type,
            "Ce-Source": source,
            "Content-Type": contenttype,
          },
        },
        corsOptions
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        <Row>
          <TableBody class="pure-form">
            <TableRow class="pure-form">
              <FormControl>
                ID:
                <TextField
                  class="pure-form"
                  id="input-injection-ceid"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <TableRow>
              <FormControl>
                Type
                <TextField
                  class="pure-form"
                  id="input-injection-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <TableRow>
              Source
              <FormControl class="pure-form">
                <TextField
                  id="input-injection-source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <TableRow>
              Content-Type
              <FormControl class="pure-form">
                <TextField
                  label=""
                  id="input-injection-contenttype"
                  value={contenttype}
                  onChange={(e) => setContenttype(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <p1 class="pure-form"> Avalible Destinations: </p1>
            <TableRow>
              <FormControl style={{ width: "190px" }}>
                <Select onChange={(e) => setDestination(e.target.value)}>
                  {services.map((data, index) => (
                    <MenuItem value={data}>{data}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableRow>
            <TableRow>
              <Button
                onClick={fetchServices}
              >
                Refresh Destinations
              </Button>
            </TableRow>
            <p1 class="pure-form"> Custom Destination: </p1>
            <TableRow>
              <FormControl class="pure-form">
                <TextField
                  id="input-injection-add"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <TableRow>
              <FormControl class="pure-form">
                Data:
                <TextArea
                  resize="true"
                  id="input-injection-data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </FormControl>
            </TableRow>
            <TableRow>
              <FormControl class="pure-form">
                <Button
                  id="input-injection-button"
                  label="Submit"
                  onClick={handleInjection}
                >
                  Send
                </Button>
              </FormControl>
            </TableRow>
          </TableBody>
        </Row>
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
                        onClick={onClickFocus}
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
