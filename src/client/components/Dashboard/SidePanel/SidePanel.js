import React from 'react';

import wrapDash from '../../../containers/WrapDash';
import ChatsList from './ChatsList/ChatsList';
import AddChat from './AddChat/AddChat';
import './SidePanel.scss';

import {
  fetchChats,
  setChat
} from '../../../state/actions/chatActions';
import {
  updateMain
} from '../../../state/actions/dashControlActions';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SidePanel-container">
        {
          this.props.dashControls.showChatsList ?
            <ChatsList
              allChats={this.props.allChats}
              fetchChats={fetchChats}
              setChat={setChat}
              userId={this.props.userInfo.id}
              determineChatHeader={this.props.determineChatHeader.bind(this)}
              findUserName={this.props.findUserName.bind(this)}
              updateMain={updateMain}
            />
          : <AddChat />

        }
      </div>
    )
  }
}

export default wrapDash(SidePanel);
