import React from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

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
          <SidebarLink title="Log Scanner" route="/LogScanner" onClick={handleHideSidebar} />
          <SidebarLink title="Event Viewer" route="/EventViewer" onClick={handleHideSidebar} />
          {/* <SidebarLink title="Weather Xt" route="/pages/WeatherXt" onClick={handleHideSidebar} /> */}
        </SidebarCategory>
      </ul>
    </div>
  );
};

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
