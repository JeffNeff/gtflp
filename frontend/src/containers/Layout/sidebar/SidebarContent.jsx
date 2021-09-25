import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({ onClick }) => {
  const handleHideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      {/* <ul className="sidebar__block">
        <SidebarLink title="Log Out" icon="exit" route="/log_in" onClick={handleHideSidebar} />
      </ul> */}
      <ul className="sidebar__block">
        <SidebarCategory title="Tools" icon="diamond">
          <SidebarLink
            title="Log Scanner"
            route="/LogScanner"
            onClick={handleHideSidebar}
          />
          {/* <SidebarLink title="Event Viewer" route="/EventViewer" onClick={handleHideSidebar} /> */}
          <SidebarLink
            title="Cloud Events"
            route="/EventInjection"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Pod Viewer"
            route="/Pods"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="KSVC Viewer"
            route="/ksvc"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Broker Viewer"
            route="/Brokers"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Trigger Viewer"
            route="/Triggers"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Bridges Viewer"
            route="/Bridges"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Sources Viewer"
            route="/Sources"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Fetch Resource by GVR"
            route="/CGVR"
            onClick={handleHideSidebar}
          />
        </SidebarCategory>
      </ul>
    </div>
  );
};

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
