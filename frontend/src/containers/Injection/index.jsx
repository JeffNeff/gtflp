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
import { Container, Row, Button } from "reactstrap";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import { TextArea } from "grommet";
import { Card, CardBody, Col } from "reactstrap";
import createPersistedState from "use-persisted-state";
import JSONPretty from "react-json-pretty";
import "../../scss/app.scss";
const useArrayState = createPersistedState("array");
const useCountertate = createPersistedState("counter");
const useStringState = createPersistedState("string");
const useEventTypeState = createPersistedState("eventtype");
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var JSONPretty1337 = require("react-json-pretty/dist/1337");
var JSONPrettyAcai = require("react-json-pretty/dist/acai");
var JSONPrettyAdv = require("react-json-pretty/dist/adventure_time");

function Injection() {
  const EventTypeSendgrid = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.sendgrid.email.send",
    "datacontenttype": "application/json",
    "data": {
        "fromEmail": "richard@triggermesh.com",
        "toEmail": "bob@gmail.com",
        "fromName": "richard",
        "toName": "bob",
        "message": "hello",
        "subject": "Hello Worlds"
    }
}`;
  const EventTypeDataDogMetricSubmit = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.datadog.metric.submit",
    "datacontenttype": "application/json",
    "data": {
        "series": [
            {
                "metric": "five.golang",
                "points": [
                    [
                        "1614962026",
                        "14.5"
                    ]
                ]
            }
        ]
    }
}`;
  const EventTypeDataDogLogSend = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.datadog.log.send",
    "datacontenttype": "application/json",
    "data": {
      "ddsource": "nginx",
      "ddtags": "env:staging,version:5.1",
      "hostname": "i-012345678",
      "message": "2019-11-19T14:37:58,995 INFO Hello World",
      "service": "payment"
    }
  }`;

  const EventTypeDataDogEventPost = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.datadog.event.post",
    "datacontenttype": "application/json",
    "data": {
        "text": "Oh boy2!",
        "title": "Did you hear the news today?"
    }
}`;

  const EventTypeGoogleFirestoreWrite = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.google.firestore.write",
    "datacontenttype": "application/json",
    "data": {
      "collection": "eventtst",
      "document": "doctests1",
      "data": {
        "fromEmail": "bob@triggermesh.com",
        "hello": "pls"
      }
    }
  }`;

  const EventTypeGoogleFirestoreQueryTables = JSON.parse`{
  "specversion": "1.0",
  "id": "536808d3-88be-4077-9d7a-a3f162705f79",
  "source": "gtflp",
  "type": "io.triggermesh.google.firestore.query.tables",
  "datacontenttype": "application/json",
  "data": {
    "collection": "eventtst"
  }
}`;

  const EventTypeGoogleFirestoreQueryTable = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.google.firestore.query.table",
    "datacontenttype": "application/json",
    "data": {
      "collection": "deploydemo",
      "document": "536808d3-88be-4077-9d7a-a3f162s705f79"
    }
  }`;

  const EventTypeGoogleSheetAppend = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.googlesheet.append",
    "datacontenttype": "application/json",
    "data": {
      "rows": [
        "Hello from Triggermesh using GoogleSheet!",
        "test",
        "sheet1"
      ],
      "sheet_name": "Sheet1"
    }
  }`;

  const EventTypeGoogleWorkflowsRun = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.trigermesh.google.workflows.run",
    "datacontenttype": "application/json",
    "data": {
      "parent": "projects/ultra-hologram-297914/locations/us-central1/workflows/demowf",
      "executionName": "projects/ultra-hologram-297914/locations/us-central1/workflows/demowf/executions/testex"
    }
  }`;

  const EventTypeJiraIssueCreate = JSON.parse`{
    "specversion": "1.0",
    "id": "123-abc",
    "source": "gtflp",
    "type": "io.triggermesh.jira.issue.create",
    "datacontenttype": "application/json",
    "data": {
      "fields": {
        "project": {
          "key": "IP"
        },
        "labels": [
          "alpha",
          "beta"
        ],
        "summary": "Day 30.",
        "description": "Issue created using Triggermesh Jira Target",
        "issuetype": {
          "name": "Task"
        },
        "assignee": {
          "accountId": "5fe0704c9edf280075f188f0"
        }
      }
    }
  }`;

  const EventTypeJiraIssueGet = JSON.parse`{
    "specversion": "1.0",
    "id": "123-abc",
    "source": "gtflp",
    "type": "io.triggermesh.jira.issue.get",
    "datacontenttype": "application/json",
    "data": {
      "id": "IP-9"
    }
  }`;

  const EventTypeSalesforceApiCall = JSON.parse`{
    "specversion": "1.0",
    "id": "123-abc",
    "source": "gtflp",
    "type": "io.triggermesh.salesforce.apicall",
    "datacontenttype": "application/json",
    "data": {
      "action": "POST",
      "resource": "sobjects",
      "object": "account",
      "payload": {
        "Name": "test"
      }
    },
    "statefulid": "my-stateful-12345",
    "somethingelse": "hello-world"
  }`;

  const EventTypeSlackScheudleMessage = JSON.parse`{
    "specversion": "1.0",
    "id": "aabbccdd11223344",
    "source": "gtflp",
    "type": "com.slack.webapi.chat.scheduleMessage",
    "datacontenttype": "application/json",
    "data": {
      "channel": "C01112A09FT",
      "text": "Hello from scheduled Triggermesh!",
      "post_at": 1593430770
    }
  }`;

  const EventTypeSlackChatUpdate = JSON.parse`{
    "specversion": "1.0",
    "id": "aabbccdd11223344",
    "source": "gtflp",
    "type": "com.slack.webapi.chat.update",
    "datacontenttype": "application/json",
    "data": {
      "channel": "C01112A09FT",
      "text": "Hello from updated2 Triggermesh!",
      "ts": "1593430770.001300"
    }
  }`;

  const EventTypeTwilioSMSSend = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "io.triggermesh.twilio.sms.send",
    "datacontenttype": "application/json",
    "data": {
      "message": "Hello from Triggermesh using Twilio!",
      "to": "+1111111111"
    }
  }`;

  const EventTypeZendeskTicketCreate = JSON.parse`{
    "specversion": "1.0",
    "id": "536808d3-88be-4077-9d7a-a3f162705f79",
    "source": "gtflp",
    "type": "com.zendesk.ticket.create",
    "datacontenttype": "application/json",
    "data": {
      "subject": "Hello",
      "body": "World"
    }
  }`;

  const EventTypeZendeskTagCreate = JSON.parse`{
  "specversion": "1.0",
  "id": "536808d3-88be-4077-9d7a-a3f162705f79",
  "source": "gtflp",
  "type": "com.zendesk.tag.create",
  "datacontenttype": "application/json",
  "data": {
    "id": 81,
    "tag": "triggermesh"
  }
}`;

  const [services, setServices] = useState([]);
  const [eventTypes, setEventTypes] = useEventTypeState([
    EventTypeDataDogMetricSubmit,
    EventTypeDataDogEventPost,
    EventTypeDataDogLogSend,
    EventTypeSendgrid,
    EventTypeGoogleFirestoreWrite,
    EventTypeGoogleFirestoreQueryTables,
    EventTypeGoogleFirestoreQueryTable,
    EventTypeGoogleSheetAppend,
    EventTypeGoogleWorkflowsRun,
    EventTypeJiraIssueCreate,
    EventTypeJiraIssueGet,
    EventTypeSalesforceApiCall,
    EventTypeSlackScheudleMessage,
    EventTypeSlackChatUpdate,
    EventTypeTwilioSMSSend,
    EventTypeZendeskTicketCreate,
    EventTypeZendeskTagCreate,
  ]);
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

  // eventTypes.map((eventType) => {
  // console.log("ETTTT")
  // console.log(eventType.id)
  // })

  const onClickFocus = (e) => {
    const it = JSON.parse(e.target.innerText);
    console.log(e);
    setID(it.id);
    setType(it.type);
    setSource(it.source);
    setContenttype(it.contenttype);
    setData(JSON.stringify(it.data));
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

  function handleEventLibrarySelection(event) {
    console.log(event);
    setID(event.id);
    setType(event.type);
    setSource(event.source);
    setContenttype(event.contenttype);
    setData(JSON.stringify(event.data));
  }

  function handleAddEventToLibrary(e) {
    const newEvent = {
      id: id,
      type: type,
      source: source,
      contenttype: contenttype,
      data: data,
    };
    setEventTypes(eventTypes.concat(newEvent));
  }

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <h5 style={{ marginBottom: 30 }}>
        {" "}
        Monitor and inject Cloudevents here!{" "}
      </h5>
      <Button
        color="secondary"
        label="-"
        onClick={() => {
          setLogsize(logsize - 5);
        }}
      >
        -
      </Button>
      <Button
        color="secondary"
        label="+"
        onClick={() => {
          setLogsize(logsize + 5);
        }}
      >
        +
      </Button>
      <Button
        color="primary"
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
      <Row style={{ marginBottom: 10 }}>
        <Col md={12}>
          <div class="pure-form">
            <FormControl>
              ID:
              <TextField
                class="cloud-input pure-form"
                id="input-injection-ceid"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </FormControl>
          </div>
        </Col>

        <Col md={12}>
          <div class="pure-form">
            <FormControl>
              Type
              <TextField
                class="cloud-input pure-form"
                id="input-injection-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </FormControl>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col md={12} style={{ marginBottom: 10 }}>
          Source
          <FormControl class="cloud-input pure-form">
            <TextField
              id="input-injection-source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={12} style={{ marginBottom: 10 }}>
          Content-Type
          <FormControl class="cloud-input pure-form">
            <TextField
              label=""
              id="input-injection-contenttype"
              value={contenttype}
              onChange={(e) => setContenttype(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={12}>
          <p1 class="pure-form"> Avalible Destinations: </p1>
          <div>
            <FormControl style={{ width: "190px" }}>
              <Select onChange={(e) => setDestination(e.target.value)}>
                {services.map((data, index) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12}>
          <Button color="primary" onClick={fetchServices}>
            Refresh Destinations
          </Button>
        </Col>

        <Col md={12} style={{ marginBottom: 30 }}>
          <p1 class="pure-form"> Custom Destination: </p1>
          <FormControl class="cloud-input pure-form">
            <TextField
              id="input-injection-add"
              onChange={(e) => setDestination(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={6} style={{ marginBottom: 30 }}>
          <FormControl class="pure-form">
            Data:
            <TextArea
              resize="true"
              id="input-injection-data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </FormControl>
        </Col>
        <Col md={12} style={{ marginBottom: 30 }}>
          Event Library:
          <Select
            // value={themeClassName}
            onChange={(e) => handleEventLibrarySelection(e.target.value)}
          >
            {eventTypes.map((eventType) => (
              <MenuItem value={eventType}>{eventType.type}</MenuItem>
            ))}
          </Select>
          <Button color="primary" onClick={handleAddEventToLibrary}>
            Add Current
          </Button>
        </Col>

        <Col md={12}>
          <FormControl class="pure-form">
            <Button
              color="success btn-lg"
              id="input-injection-button"
              label="Submit"
              onClick={handleInjection}
            >
              Send
            </Button>
          </FormControl>
        </Col>
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
