import React from 'react';

import wrapDash from '../../../containers/WrapDash';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import './SidePanel.scss';
import SideNav from './SideNav/SideNav';
import {
  fetchChats,
  setChat
} from '../../../state/actions/chatActions';
import {
  updateMain,
  updateSide
} from '../../../state/actions/dashControlActions';
import { showChatsListType } from '../../../state/actionTypes';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  navToChatsList() {
    this.props.dispatch(updateSide(showChatsListType));
  }

  render() {
    return (
      <div className="SidePanel-container">
        <SideNav
          navToChatsList={this.navToChatsList.bind(this)}
          inAddChat={this.props.dashControls.showAddChat}
          inGroupForm={this.props.dashControls.showGroupForm}
        />
        {
          this.props.dashControls.showChatsList ?
            <ChatsList
              allChats={this.props.allChats}
              fetchChats={fetchChats}
              setChat={setChat}
              userId={this.props.userInfo.id}
              determineChatHeader={this.props.determineChatHeader.bind(this)}
              findUserName={this.props.findUserName}
              updateMain={updateMain}
            />
          : <AddChat />

        }
      </div>
    )
  }
}

export default wrapDash(SidePanel);
