import React from 'react';
import FaContacts from 'react-icons/lib/ti/contacts';
import FaBookmarks from 'react-icons/lib/ti/bookmark';
import FaUser from 'react-icons/lib/ti/user-outline';
import FaChats from 'react-icons/lib/ti/messages';

import './SideNav.scss';
import FaBackArrow from 'react-icons/lib/md/arrow-back';

const SideNav = ({ handleNavToChats, inAddChat, inGroupForm, userInfo, handleNavToProfile, handleNavToBookmarks, handleNavToContacts }) => (
  <div className="SideNav-container">
    {
      inAddChat ?
        <FaBackArrow className="SideNav-icon" onClick={handleNavToChats}/>
      : null
    }
    {
      inAddChat ?
        inGroupForm ?
          <h2 className="SideNav-header">New Group</h2>
        : <h2 className="SideNav-header">New Chat</h2>
      : <div className="SideNav-home">
          <div className="SideNav-user-info">
            <h2>{userInfo.firstName} {userInfo.lastName}</h2>
          </div>

          <div className="SideNav-user-options">
            <FaUser
              className="SideNav-home-icon"
              onClick={handleNavToProfile}
            />
            <FaContacts
              className="SideNav-home-icon"
              onClick={handleNavToContacts}
            />
            <FaBookmarks
              className="SideNav-home-icon"
              onClick={handleNavToBookmarks}
            />
            <FaChats
              className="SideNav-home-icon chats"
              onClick={handleNavToChats}
            />
          </div>
        </div>
    }
  </div>
)

export default SideNav;
