import React from 'react';

import './SideNav.scss';
import FaBackArrow from 'react-icons/lib/md/arrow-back';

const SideNav = ({ navToChatsList, inAddChat, inGroupForm }) => (
  <div className="SideNav-container">
    {
      inAddChat ?
        <FaBackArrow className="SideNav-icon" onClick={navToChatsList}/>
      : null
    }
    {
      inAddChat ?
        inGroupForm ?
          <h2 className="SideNav-header">New Group</h2>
        : <h2 className="SideNav-header">New Chat</h2>
      : <h2 className="SideNav-header SideNav-home">Chats</h2>
    }
  </div>
)

export default SideNav;
