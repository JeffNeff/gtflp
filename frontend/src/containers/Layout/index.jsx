import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import createPersistedState from "use-persisted-state";
import ReconnectingWebSocket from "reconnecting-websocket";
const useArrayState = createPersistedState("array");
const useMessagesState = createPersistedState("messages");
// const usePodState = createPersistedState("pods");

const Layout = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [events, setEvents] = useArrayState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useMessagesState([]);
  // const [podNames, setPodNames] = usePodState([]);

  const layoutClass = classNames({
    layout: true,
    "layout--collapse": isSidebarCollapsed,
  });

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  useEffect(() => {

    console.log("Protocol: " + window.location.protocol);
    let wsURL = "ws://" + document.location.host + "/ws";

    if (window.location.protocol === "https:") {
      wsURL = "wss://" + document.location.host + "/ws";
    }

    // for yarn start development uncomment this
    // wsURL = "ws://localhost:8080/ws"

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
      if (t.pod === undefined) {
        console.log("Got Event");
        setEvents(events.concat(t));
      } else  {
        console.log("Got log:" + t.message);
        // if (podNames.includes(t.pod) == false) {
        //   setPodNames(podNames.concat(t.pod));
        // }
        setMessages(messages.concat(t.pod + " : " + t.message));
      }
    };
    return () => {
      sock.close();
    };
  });

  return (
    <div className={layoutClass}>
      \
      <Topbar
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        changeSidebarVisibility={changeSidebarVisibility}
      />
      <Sidebar
        sidebarShow={isSidebarShown}
        sidebarCollapse={isSidebarCollapsed}
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
      />
    </div>
  );
};

export default withRouter(Layout);
