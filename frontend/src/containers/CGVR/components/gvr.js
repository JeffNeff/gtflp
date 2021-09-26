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
import {
  TextField,
  TableRow,
  FormControl,
  Button,
  TableBody,
} from "@material-ui/core";
import JSONPretty from "react-json-pretty";
const axios = require("axios");

export default function GVR(props) {
  const [group, setGroup] = useState("eventing.knative.dev");
  const [version, setVersion] = useState("v1");
  const [resource, setResource] = useState("brokers");
  const [list, setList] = React.useState([]);

  const corsOptions = {
    origin: "*",
  };

  function fetchCGVR() {
    axios
      .post(
        "/fetchCGVR",
        {
          group: group,
          version: version,
          resource: resource,
        },
        corsOptions
      )
      .then(function (response) {
        console.log(response);
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchMoreInfo() {
    axios
      .post(
        "/fetchVerboseCGVR",
        {
          group: group,
          version: version,
          resource: resource,
        },
        corsOptions
      )
      .then(function (response) {
        console.log(response);
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <TableBody class="pure-form">
      <TableRow class="pure-form">
        <FormControl>
          Group:
          <TextField
            class="pure-form"
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </FormControl>
      </TableRow>
      <TableRow>
        <FormControl>
          Version:
          <TextField
            class="pure-form"
            id="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </FormControl>
      </TableRow>
      <TableRow>
        Resource:
        <FormControl class="pure-form">
          <TextField
            id="resource"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          />
        </FormControl>
      </TableRow>
      <Button id="lessinfo" onClick={fetchCGVR}>
        Less Info
      </Button>
      <Button id="moreinfo" onClick={fetchMoreInfo}>
        More Info
      </Button>
        <JSONPretty
          style={{ fontSize: props.logsize }}
          json={list}
          theme={props.theme}
        />
    </TableBody>
  );
}
