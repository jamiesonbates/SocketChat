import React from 'react';
import FaWaves from 'react-icons/lib/ti/waves-outline';

import wrapSidePanel from '../../../containers/WrapSidePanel';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import ContactsList from './AddChat/ContactsList/ContactsList';
import './SidePanel.scss';
import SideNav from './SideNav/SideNav';
import SearchContacts from './AddChat/SearchContacts/SearchContacts';
import { showChatsListType, showUserProfileType, showContactsListType, showDefaultMainType, searchForOtherUsersType } from '../../../state/actionTypes';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavToProfile() {
    const userId = this.props.userId;

    this.props.updateTargetUserId(userId);
    this.props.updateMain(showUserProfileType);
  }

  handleNavToBookmarks() {
    const userId = this.props.userId;

    this.props.setBookmarks({ userId });
  }

  handleNavToContacts() {
    this.props.updateSide(showContactsListType);
  }

  handleNavToChats() {
    this.props.updateSide(showChatsListType);
  }

  handleNavToDefaultMain() {
    this.props.updateMain(showDefaultMainType)
  }

  handleSearchForOtherUsers() {
    this.props.updateSide(searchForOtherUsersType);
    this.props.findContacts();
  }

  render() {
    return (
      <div className="SidePanel-container">
        <SideNav
          handleNavToChats={this.handleNavToChats.bind(this)}
          inAddChat={this.props.showAddChat}
          inGroupForm={this.props.showGroupForm}
          userInfo={this.props.userInfo}
          handleNavToProfile={this.handleNavToProfile.bind(this)}
          handleNavToBookmarks={this.handleNavToBookmarks.bind(this)}
          handleNavToContacts={this.handleNavToContacts.bind(this)}
          handleNavToDefaultMain={this.handleNavToDefaultMain.bind(this)}
        />
        {
          this.props.showChatsList ?
            <ChatsList
              determineChatHeader={this.props.determineChatHeader.bind(this)}
            />
          : this.props.showContactsList ?
              <div>
                <SearchContacts
                  updateSearchTerm={this.props.updateSearchTerm}
                  searchTermVal={this.props.searchTerm}
                  showGroupForm={false}
                />
                <ContactsList
                  header={'Your Contacts'}
                  contacts={this.props.usersContacts}
                  searchTerm={this.props.searchTerm}
                  handleContactClick={this.handleNavToContacts.bind(this)}
                />

                {
                  this.props.searchForOtherUsers ?
                    <ContactsList
                      header={'Other Users'}
                      contacts={this.props.otherContacts}
                      searchTerm={this.props.searchTerm}
                      handleContactClick={this.handleNavToContacts.bind(this)}
                    />
                  : null
                }

                {
                  !this.props.searchForOtherUsers ?
                    <div className="SidePanel-search-other-users" onClick={this.handleSearchForOtherUsers.bind(this)}>
                      Search for others using socket chat
                    </div>
                  : null
                }
              </div>
            : <AddChat />

        }

        <div className="SidePanel-header">
          <FaWaves className="SidePanel-logo-icon"/>
          <h1>Socket Chat</h1>
        </div>
      </div>
    )
  }
}

export default wrapSidePanel(SidePanel);
