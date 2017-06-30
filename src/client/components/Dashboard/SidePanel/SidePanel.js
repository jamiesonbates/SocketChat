import React from 'react';

import wrapSidePanel from '../../../containers/WrapSidePanel';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import './SidePanel.scss';
import SideNav from './SideNav/SideNav';
import { showChatsListType } from '../../../state/actionTypes';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);

  }

  navToChatsList() {
    this.props.updateSide(showChatsListType);
  }

  render() {
    return (
      <div className="SidePanel-container">
        <SideNav
          navToChatsList={this.navToChatsList.bind(this)}
          inAddChat={this.props.showAddChat}
          inGroupForm={this.props.showGroupForm}
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
