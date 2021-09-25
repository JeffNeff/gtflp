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

import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";

import LogContainer from "../LogContainer";
import Injection from "../Injection";
import Pods from "../Pods";
import Ksvc from "../Ksvc";
import Brokers from "../Brokers";
import Triggers from "../Triggers";

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/LogScanner" component={LogContainer} />
      <Route path="/EventInjection" component={Injection} />
      <Route path="/Pods" component={Pods} />
      <Route path="/Ksvc" component={Ksvc} />
      <Route path="/Brokers" component={Brokers} />
      <Route path="/Triggers" component={Triggers} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
