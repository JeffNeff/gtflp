import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TopbarSidebarButton from "./TopbarSidebarButton";
import TopbarProfile from "./TopbarProfile";
import GitHubIcon from "@mui/icons-material/GitHub";
import Links from "@material-ui/core/Link";

const Topbar = ({ changeMobileSidebarVisibility, changeSidebarVisibility }) => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">
        <TopbarSidebarButton
          changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          changeSidebarVisibility={changeSidebarVisibility}
        />
        <Link className="topbar__logo" to="/" />
      </div>
      <div className="topbar__right">
        <TopbarProfile />
        <Links
          href="https://github.com/JeffNeff/gtflp"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GitHubIcon />
        </Links>
      </div>
    </div>
  </div>
);

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;
