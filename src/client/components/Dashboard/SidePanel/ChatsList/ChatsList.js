import React from 'react';
import moment from 'moment';
import FaNewChat from 'react-icons/lib/md/add-circle-outline';
import FaContacts from 'react-icons/lib/ti/contacts';

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
      return 'No messages yet.';
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

        <div className="ChatsList-list">
          {
            this.props.allChats ?
              this.props.allChats
                .sort((a, b) => {
                  if (!a.messages) {
                    a.messages = [];
                  }

                  if (!b.messages) {
                    b.messages = [];
                  }

                  if (a.messages.length && b.messages.length) {
                    const aLast = a.messages[a.messages.length - 1].createdAt;
                    const bLast = b.messages[b.messages.length - 1].createdAt;

                    if (moment(aLast).valueOf() > moment(bLast).valueOf()) {
                      return -1;
                    }
                    else if (moment(bLast).valueOf() > moment(aLast).valueOf()){
                      return 1;
                    }
                    else {
                      return 0;
                    }
                  }
                  else if (a.messages.length && !b.messages.length) {
                    return -1;
                  }
                  else if (b.messages.length && !a.messages.length) {
                    return 1;
                  }
                  else {
                    return 0;
                  }
                })
                .map((chat, i) => (
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
                        time={chat.messages ?
                            chat.messages.length ?
                              Utilities.timeDisplay(chat.messages[chat.messages.length - 1].createdAt)
                            : null
                          : null
                        }
                      />
                    }
                  </div>
                ))
            : <div className="ChatsList-helper">
                <p>You haven't started chatting yet.</p>

                <div className="ChatsList-helper-options">
                  <button
                    className="ChatsList-option-btn"
                    onClick={this.props.handleNavToContacts}>
                    <FaContacts className="ChatsList-option-icon" />
                    Find People
                  </button>

                  <button
                    className="ChatsList-option-btn"
                    onClick={() => this.props.updateSide(showAddChatType)}>
                    <FaNewChat className="ChatsList-option-icon" />
                    Create a Chat
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default wrapSidePanel(ChatsList);
