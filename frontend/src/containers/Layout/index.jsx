import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

import createPersistedState from "use-persisted-state";
import ReconnectingWebSocket from "reconnecting-websocket";
const useArrayState = createPersistedState("array");

const Layout = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [events, setEvents] = useArrayState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const layoutClass = classNames({
    layout: true,
    'layout--collapse': isSidebarCollapsed,
  });

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(!isSidebarShown);
  };


  useEffect(() => {
    // this is not working
    window.addEventListener("beforeunload", (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      onClose();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    });

    console.log("Protocol: " + window.location.protocol);
    let wsURL = "ws://" + document.location.host + "/ws";

    if (window.location.protocol === "https:") {
      wsURL = "wss://" + document.location.host + "/ws";
    }

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
      console.log(t);
      setEvents(events.concat(t));
    };
    return () => {
      sock.close();
    };
  });


  return (
    <div className={layoutClass} >\
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
