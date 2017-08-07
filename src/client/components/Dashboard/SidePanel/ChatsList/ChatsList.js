import React from 'react';
import moment from 'moment';
import FaNewChat from 'react-icons/lib/md/add-circle-outline';

import './ChatsList.scss';
import wrapSidePanel from '../../../../containers/WrapSidePanel';
import ChatPeak from './ChatPeak/ChatPeak';
import { showChatType, showAddChatType } from '../../../../state/actionTypes';
import Utilities from '../../../../utilities/Utilities';

class ChatsList extends React.Component {
  constructor(props) {
    super(props);

  }

  updateTime() {
    this.setState({});
  }

  openChat(id) {
    this.props.setChat(id);
    this.props.updateMain(showChatType);
  }

  determineLastMessage(chat) {
    if (!chat.messages || !chat.messages.length) {
      return '';
    }

    const lastMsgObj = chat.messages[chat.messages.length - 1];
    const lastMsg = lastMsgObj.message;
    const lastMsgUser = Utilities.findUser(chat.users, lastMsgObj.userId);

    if (lastMsgUser.id === this.props.userId) {
      return `You: ${lastMsg}`;
    }
    else {
      return `${lastMsgUser.firstName}: ${lastMsg}`;
    }
  }

  componentDidMount() {
    setInterval(this.updateTime.bind(this), 30000);
  }

  render() {
    return (
      <div className="ChatsList-container">
        <div className="ChatsList-header">
          <h3 className="ChatsList-title">Your Chats</h3>

          <FaNewChat
            className="ChatsList-newChat-btn"
            onClick={() => this.props.updateSide(showAddChatType)}
          />
        </div>
        {
          this.props.allChats ?
            this.props.allChats.map((chat, i) => (
                <div
                  key={i}
                  className="ChatsList-chat"
                  onClick={() => this.openChat(chat.id)}>
                  {
                    <ChatPeak
                      chat={chat}
                      chatNewMessages={Utilities.findChat(this.props.chatNewMessages, chat.id)}
                      userId={this.props.userId}
                      determineChatHeader={this.props.determineChatHeader}
                      determineLastMessage={this.determineLastMessage.bind(this)}
                      time={chat.messages ? Utilities.timeDisplay(chat.messages[chat.messages.length - 1].createdAt) : null}
                    />
                  }
                </div>
              ))
            : null
        }
      </div>
    )
  }
}

export default wrapSidePanel(ChatsList);
