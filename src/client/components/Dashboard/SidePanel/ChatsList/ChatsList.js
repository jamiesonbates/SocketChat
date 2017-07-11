import React from 'react';
import moment from 'moment';
import FaNewChat from 'react-icons/lib/md/add-circle-outline';

import './ChatsList.css';
import wrapSidePanel from '../../../../containers/WrapSidePanel';
import ChatPeak from './ChatPeak/ChatPeak';
import { showChatType, showAddChatType } from '../../../../state/actionTypes';
import Utilities from '../../../../utilities/Utilities';
console.log(Utilities);

class ChatsList extends React.Component {
  constructor(props) {
    super(props);
  }

  openChat(id) {
    this.props.setChat(id);
    this.props.updateMain(showChatType);
  }

  // TODO: used in multiple places
  determineTimeDisplay(chat) {
    if (!chat.messages || !chat.messages.length) {
      return '';
    }

    const time = chat.messages[chat.messages.length - 1].createdAt;
    const nowMil = moment(Date.now()).valueOf();
    const timeMil = moment(time).valueOf();
    const diff = nowMil - timeMil;
    const midnightDiff = nowMil - moment(new Date().setUTCHours(0, 0, 0, 0)).valueOf();
    const weekAgoDiff = nowMil - moment(Date.now()).subtract(6, 'days').valueOf();

    if (diff < 60000) {
      return 'Now';
    }
    else if (diff < 3600000) {
      return Math.floor(diff / 60000) + 'm'
    }
    else if (diff < midnightDiff) {
      return moment(timeMil).format('h:mm A');
    }
    else if (diff < weekAgoDiff) {
      return moment(timeMil).format('ddd');
    }
    else {
      return moment(timeMil).format('M/D/YY');
    }
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
          this.props.allChats
            ? this.props.allChats.map((chat, i) => (
                <div
                  key={i}
                  className="ChatsList-chat"
                  onClick={() => this.openChat(chat.id)}>
                  {
                    <ChatPeak
                      chat={chat}
                      userId={this.props.userId}
                      determineChatHeader={this.props.determineChatHeader}
                      determineLastMessage={this.determineLastMessage.bind(this)}
                      time={this.determineTimeDisplay(chat)}
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
