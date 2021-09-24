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
import JSONPretty from "react-json-pretty";
import { Card, CardBody, Col } from "reactstrap";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

function LogCard(props) {
  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <div>
            {props.messages.map((message, index) => {
              // search for the `:` we placed earlier
              let sr = message.search(":");
              // get the pod name
              // check to see if the pod contains the name `gtflp`
              let check = message.search("gtflp");
              if (check > -1) {
                return;
              }
              let podname = message.substring(0, sr);
              // get the log message
              let lm = message.substring(sr + 1, message.length);
              return (
                <div key={index}>
                  <h3 className="bold-text">{podname}</h3>
                  <JSONPretty style={{fontSize: props.logsize}} json={lm} theme={JSONPrettyMon} />
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default LogCard;
