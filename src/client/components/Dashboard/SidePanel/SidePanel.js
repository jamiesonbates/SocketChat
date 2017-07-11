import React from 'react';

import wrapSidePanel from '../../../containers/WrapSidePanel';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import ContactsList from './AddChat/ContactsList/ContactsList';
import './SidePanel.scss';
import SideNav from './SideNav/SideNav';
import SearchContacts from './AddChat/SearchContacts/SearchContacts';
import { showChatsListType, showUserProfileType, showContactsListType } from '../../../state/actionTypes';

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
                  usersContacts={this.props.usersContacts}
                  searchTerm={this.props.searchTerm}
                  handleContactClick={this.handleNavToContacts.bind(this)}
                />
              </div>
            : <AddChat />

        }
      </div>
    )
  }
}

export default wrapSidePanel(SidePanel);
