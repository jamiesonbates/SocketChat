import React from 'react';
import FaContacts from 'react-icons/lib/ti/contacts';
import FaBookmarks from 'react-icons/lib/ti/bookmark';
import FaUser from 'react-icons/lib/ti/user-outline';
import FaChats from 'react-icons/lib/ti/messages';
import FaHome from 'react-icons/lib/ti/home-outline';

import './SideNav.scss';
import FaBackArrow from 'react-icons/lib/md/arrow-back';

const SideNav = ({ handleNavToChats, inAddChat, inGroupForm, userInfo, handleNavToProfile, handleNavToBookmarks, handleNavToContacts, handleNavToDefaultMain, handleCreateNewGroup }) => (
  <div className="SideNav-container">
    {
      inAddChat ?
        <FaBackArrow className="SideNav-icon" onClick={handleNavToChats}/>
      : null
    }
    {
      inAddChat ?
        inGroupForm ?
          <div className="SideNav-header-container">
            <h2 className="SideNav-header">New Group</h2>

            <button
              className="SideNav-create-group"
              onClick={handleCreateNewGroup}>
              Create Group
            </button>
          </div>
        : <h2 className="SideNav-header">New Chat</h2>
      : <div className="SideNav-home">
          <div className="SideNav-user-info">
            <h2>{userInfo.firstName} {userInfo.lastName}</h2>
          </div>

          <div className="SideNav-user-options">
            <FaHome
              className="SideNav-home-icon"
              onClick={handleNavToDefaultMain}
            />
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
