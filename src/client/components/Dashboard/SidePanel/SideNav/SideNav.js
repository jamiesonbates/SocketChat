import React from 'react';

import './SideNav.scss';
import FaBackArrow from 'react-icons/lib/md/keyboard-arrow-down';

const SideNav = ({ sideNavTitle, navToChatsList }) => (
  <div className="SideNav-container">
    <FaBackArrow className="SideNav-icon" onClick={navToChatsList}/>
    <h2>sideNavTitle</h2>
  </div>
)

export default SideNav;
