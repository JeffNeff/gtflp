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
import { Container } from "reactstrap";
import axios from "axios";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
import { Button } from "@material-ui/core";

function Triggers() {
  const [triggers, setTriggers] = React.useState([]);
  const [logsize, setLogsize] = useCounterState(10);

  const corsOptions = {
    origin: "*",
  };
  function fetchTriggers() {
    axios.get("/fetchTriggers", corsOptions).then((response) => {
      console.log(response.data);
      setTriggers(response.data);
    });
  }
  function fetchMoreInfo() {
    axios.get("/fetchVerboseTriggers", corsOptions).then((response) => {
      console.log(response.data);
      setTriggers(response.data);
    });
  }

  useEffect(() => {
    fetchTriggers();
  }, []);

  return (
    <Container>
      <h3 className="page-title">Trigger Viewer:</h3>
      <h5> View active trigger info here! </h5>
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
          fetchTriggers();
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
          fetchTriggers();
        }}
      >
        Less Info
      </Button>
      <JSONPretty
        style={{ fontSize: logsize }}
        json={triggers}
        theme={JSONPrettyMon}
      />
    </Container>
  );
}

export default Triggers;
