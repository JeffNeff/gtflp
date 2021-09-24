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

function Ksvc() {
  const [pods, setPods] = React.useState([]);
  const [logsize, setLogsize] = useCounterState(10);

  const corsOptions = {
    origin: "*",
  };
  function fetchPods() {
    axios.get("/fetchKsvc", corsOptions).then((response) => {
      console.log(response.data);
      setPods(response.data);
    });
  }
  function fetchMoreInfo() {
    axios.get("/fetchVerboseKsvc", corsOptions).then((response) => {
      console.log(response.data);
      setPods(response.data);
    });
  }

  useEffect(() => {
    fetchPods();
    return () => {
    };
  }, []);

  return (
    <Container>
      <h3 className="page-title">KSVC Viewer:</h3>
      <h5> View deployed Knative Service Objects here! </h5>
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
          fetchPods();
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
          fetchPods();
        }}
      >
        Less Info
      </Button>
      <JSONPretty
        style={{ fontSize: logsize }}
        json={pods}
        theme={JSONPrettyMon}
      />
    </Container>
  );
}

export default Ksvc;