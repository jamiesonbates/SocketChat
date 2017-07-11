import React from 'react';

import wrapSidePanel from '../../../containers/WrapSidePanel';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import './SidePanel.scss';
import SideNav from './SideNav/SideNav';
import { showChatsListType, showUserProfileType } from '../../../state/actionTypes';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);

  }

  navToChatsList() {
    this.props.updateSide(showChatsListType);
  }

  handleNavToProfile() {
    const userId = this.props.userId;

    this.props.updateTargetUserId(userId);
    this.props.updateMain(showUserProfileType);
  }

  handleNavToBookmarks() {
    console.log('here');
    const userId = this.props.userId;

    this.props.setBookmarks(userId);
  }

  render() {
    return (
      <div className="SidePanel-container">
        <SideNav
          navToChatsList={this.navToChatsList.bind(this)}
          inAddChat={this.props.showAddChat}
          inGroupForm={this.props.showGroupForm}
          userInfo={this.props.userInfo}
          handleNavToProfile={this.handleNavToProfile.bind(this)}
          handleNavToBookmarks={this.handleNavToBookmarks.bind(this)}
        />
        {
          this.props.showChatsList ?
            <ChatsList
              determineChatHeader={this.props.determineChatHeader.bind(this)}
            />
          : <AddChat />

        }
      </div>
    )
  }
}

export default wrapSidePanel(SidePanel);
