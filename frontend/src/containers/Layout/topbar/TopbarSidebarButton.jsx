import React from 'react';
import PropTypes from 'prop-types';

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const TopbarSidebarButton = ({ changeMobileSidebarVisibility, changeSidebarVisibility }) => (
  <div>
    <button type="button" className="topbar__button topbar__button--desktop" onClick={changeSidebarVisibility}>
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
    <button type="button" className="topbar__button topbar__button--mobile" onClick={changeMobileSidebarVisibility}>
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
  </div>
);

TopbarSidebarButton.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default TopbarSidebarButton;
