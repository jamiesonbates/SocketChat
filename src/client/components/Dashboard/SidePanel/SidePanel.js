import React from 'react';
import FaWaves from 'react-icons/lib/ti/waves-outline';
import FaDown from 'react-icons/lib/ti/arrow-sorted-down';

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
    this.props.updateUserProfile(userId);
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
  }

  handleAddSingleChat(userId) {
    let chatId;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length < 3) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      for (const user of chat.users) {
        if (user.id === userId) {
          chatId = chat.id;
          acc = true;

          return acc;
        }
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.setChat(chatId);
    }
    else {
      this.props.createChat([userId]);
    }

    this.handleNavToChats();
  }

  handleCreateNewGroup() {
    let chatId;
    const newGroup = this.props.newGroup;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length === newGroup.length + 1) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      const newGroup = this.props.newGroup;

      const matchCount = newGroup.reduce((acc, userId) => {
        for (const user of chat.users) {
          if (userId.id === user.id) {
            acc += 1;

            return acc;
          }
        }

        return acc;
      }, 0);

      if (matchCount === chat.users.length) {
        acc = true;
        chatId = chat.id;

        return acc;
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.setChat(chatId);
    }
    else {
      let userGroup = [
        ...this.props.newGroup
      ]
      .map(user => user.id);

      this.props.createChat(userGroup);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="SidePanel-container">
        <div className="SidePanel-main">
          <SideNav
            handleNavToChats={this.handleNavToChats.bind(this)}
            inAddChat={this.props.showAddChat}
            inGroupForm={this.props.showGroupForm}
            userInfo={this.props.userInfo}
            handleNavToProfile={this.handleNavToProfile.bind(this)}
            handleNavToBookmarks={this.handleNavToBookmarks.bind(this)}
            handleNavToContacts={this.handleNavToContacts.bind(this)}
            handleNavToDefaultMain={this.handleNavToDefaultMain.bind(this)}
            handleCreateNewGroup={this.handleCreateNewGroup.bind(this)}
          />
          {
            this.props.showChatsList ?
              <ChatsList
                determineChatHeader={this.props.determineChatHeader.bind(this)}
              />
            : this.props.showContactsList ?
                <div className="SidePanel-contacts-container">
                  <SearchContacts
                    updateSearchTerm={this.props.updateSearchTerm}
                    searchTerm={this.props.searchTerm}
                    showGroupForm={false}
                    findContacts={this.props.findContacts}
                  />
                  <ContactsList
                    header={'Your Contacts'}
                    contacts={this.props.usersContacts}
                    searchTerm={this.props.searchTerm}
                    handleContactClick={this.handleAddSingleChat.bind(this)}
                  />

                  {
                    this.props.searchForOtherUsers ?
                      <ContactsList
                        header={'Other Users'}
                        contacts={this.props.otherContacts}
                        searchTerm={this.props.searchTerm}
                        handleContactClick={this.handleAddSingleChat.bind(this)}
                      />
                    : <div
                        className="SidePanel-search-other-users"
                        onClick={this.handleSearchForOtherUsers.bind(this)}>
                        <div className="container">
                          <FaWaves className="SidePanel-search-other-users-icon waves" />
                          <p>Find new people</p>
                        </div>

                        <FaDown className="SidePanel-search-other-users-icon" />
                      </div>
                  }
                </div>
              : <AddChat
                  handleSearchForOtherUsers={this.handleSearchForOtherUsers.bind(this)}
                  handleAddSingleChat={this.handleAddSingleChat.bind(this)}
                />

          }
        </div>

        <div className="SidePanel-footer">
          <FaWaves className="SidePanel-logo-icon"/>
          <h1>Socket Chat</h1>
        </div>
      </div>
    )
  }
}

export default wrapSidePanel(SidePanel);
