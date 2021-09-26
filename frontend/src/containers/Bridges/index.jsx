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
import { Button, Select, MenuItem } from "@material-ui/core";
import { Container } from "reactstrap";
import axios from "axios";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var JSONPretty1337 = require("react-json-pretty/dist/1337");
var JSONPrettyAcai = require("react-json-pretty/dist/acai");
var JSONPrettyAdv = require("react-json-pretty/dist/adventure_time");
const useCounterState = createPersistedState("count");
const useStringState = createPersistedState("string");

function Bridges() {
  const [bridges, setBridges] = React.useState([]);
  const [logsize, setLogsize] = useCounterState(10);
  const [themeClassName, setThemeClassName] = useStringState(JSONPrettyMon);

  const corsOptions = {
    origin: "*",
  };
  function fetchBridges() {
    axios.get("/fetchBridges", corsOptions).then((response) => {
      console.log(response.data);
      setBridges(response.data);
    });
  }
  function fetchMoreInfo() {
    axios.get("/fetchVerboseBridges", corsOptions).then((response) => {
      console.log(response.data);
      setBridges(response.data);
    });
  }

  useEffect(() => {
    fetchBridges();
  }, );

  return (
    <Container>
      <h3 className="page-title">Bridge Viewer:</h3>
      <h5> View deployed Bridge info here! </h5>
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
        label="+"
        onClick={() => {
          fetchBridges();
        }}
      >
        Refresh
      </Button>
      <Button
        label="+"
        onClick={() => {
          fetchMoreInfo();
        }}
      >
        More Info
      </Button>
      <Button
        label="+"
        onClick={() => {
          fetchBridges();
        }}
      >
        Less Info
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
      <JSONPretty
        style={{ fontSize: logsize }}
        json={bridges}
        theme={themeClassName}
      />
    </Container>
  );
}

export default Bridges;
