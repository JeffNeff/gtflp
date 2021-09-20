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
import PropTypes from "prop-types";

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const TopbarSidebarButton = ({
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
}) => (
  <div>
    <button
      type="button"
      className="topbar__button topbar__button--desktop"
      onClick={changeSidebarVisibility}
    >
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
    <button
      type="button"
      className="topbar__button topbar__button--mobile"
      onClick={changeMobileSidebarVisibility}
    >
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
  </div>
);

TopbarSidebarButton.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default TopbarSidebarButton;
