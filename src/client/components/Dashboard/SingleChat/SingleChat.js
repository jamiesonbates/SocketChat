import React from 'react';
import moment from 'moment';
import FaMessage from 'react-icons/lib/fa/comment';
import FaUsers from 'react-icons/lib/fa/user-plus';
import FaUser from 'react-icons/lib/fa/user';

import './SingleChat.css';
import wrapSingleChat from '../../../containers/WrapSingleChat';
import { showUserProfileType } from '../../../state/actionTypes';
import Message from './Message';
import Typing from './Typing';
import Utilities from '../../../utilities/Utilities';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.handleTyping = this.handleTyping.bind(this);
  }

  scrollToBottom() {
    const msgDiv = document.querySelector('.SingleChat-messages-container');

    msgDiv.scrollTop = msgDiv.scrollHeight;
  }

  handleSendMessage(e) {
    e.preventDefault();
    const message = this.refs.msg.value;
    const userId = this.props.userId;
    const chatId = this.props.chatId;

    if (message.length < 1) {
      return;
    }

    this.props.sendMessage({ message, userId, chatId });
    this.props.stoppedTyping(chatId);
    this.refs.messageForm.reset();
  }

  handleTyping(isTyping) {
    const chatId = this.props.chatId;

    if (isTyping) {
      this.props.startedTyping(chatId);
    }
    else {
      this.props.stoppedTyping(chatId);
    }
  }

  handleClickOnUser(userId) {
    this.props.updateTargetUserId(userId);
    this.props.updateMain(showUserProfileType);
  }

  // TODO: used multiple places - condense
  userIsOnline(userId) {
    const bool = this.props.usersOnline.reduce((acc, id) => {
      if (id === userId) {
        acc = true;
      }

      return acc;
    }, false);

    return bool;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="SingleChat-container">
        <div className="SingleChat-header-container">
          <div className="SingleChat-title">
            {
              this.props.singleChat ?
                <FaMessage className="SingleChat-icon" />
              : null
            }

            {
              this.props.singleChat ?
                <div className="SingleChat-header-title">
                  <h2>{this.props.determineChatHeader(this.props.singleChat)}</h2>
                </div>
              : null
            }

            {
              this.props.singleChat && this.props.users.length < 3 ?
                this.props.users.map((user, i) => (
                  this.userIsOnline(user.id) && user.id !== this.props.userId ?
                    <div
                      key={i}
                      className="SingleChat-userIsOnline-large">
                    </div>
                  : null

                ))
              : null
            }
          </div>

          <div className="SingleChat-header-options">
            {
              this.props.singleChat && this.props.users.length > 2 ?
                this.props.users.map((user, i) => {
                  if (user.id === this.props.userId) {
                    return null;
                  }

                  return (
                    <div key={i} className="SingleChat-user" onClick={() => this.handleClickOnUser(user.id)}>
                      <p>{`${user.firstName} ${user.lastName}`}</p>
                      {
                        this.userIsOnline(user.id) ?
                          <div className="SingleChat-userIsOnline"></div>
                        : <div className="SingleChat-userIsOffline"></div>
                      }
                    </div>
                  )
                })
              : null
            }
          </div>
        </div>

        <div className="SingleChat-messages-container">
          {
            this.props.singleChat && this.props.messages ?
                this.props.messages.map((message, i) => {
                  const allMessages = this.props.messages;

                  let messageJSX = <div key={i} className="SingleChat-message">
                    {
                      message.userId === this.props.userId ?
                        <Message
                          messagePositionClass={'SingleChat-message-position-currentUser'}
                          messageColorClass={'SingleChat-message-color-currentUser'}
                          message={message}
                          user={null}
                        />
                      :
                        <Message
                          messagePositionClass={'SingleChat-message-position-otherUser'}
                          messageColorClass={'SingleChat-message-color-otherUser'}
                          message={message}
                          user={
                            Utilities.findUser(this.props.singleChat.users, message.userId)
                          }
                        />
                    }
                  </div>

                  if (i + 1 < allMessages.length) {
                    let lastDate;

                    if (i !== 0) {
                      lastDate = moment(allMessages[i - 1].createdAt).date();
                    }

                    const curDate = moment(allMessages[i].createdAt).date();
                    const nextDate = moment(allMessages[i + 1].createdAt).date()
                    let todayDate = new Date();
                    let yesterdayDate = new Date();

                    todayDate = todayDate.getDate();
                    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                    yesterdayDate = yesterdayDate.getDate();

                    if (i === 0 && todayDate === curDate) {
                      messageJSX =
                        <div key={i} className="SingleChat-single-message-container">
                          <div className="SingleChat-time">
                            <h4>Today</h4>
                            <div className="SingleChat-line"></div>
                          </div>
                          {messageJSX}
                        </div>
                    }
                    else if (curDate !== lastDate && curDate === todayDate) {
                      messageJSX =
                        <div key={i} className="SingleChat-single-message-container">
                          <div className="SingleChat-time">
                            <h4>Today</h4>
                            <div className="SingleChat-line"></div>
                          </div>
                          {messageJSX}
                        </div>
                    }
                    else if (curDate !== nextDate && curDate === yesterdayDate) {
                      messageJSX =
                        <div key={i} className="SingleChat-single-message-container">
                          <div className="SingleChat-time">
                            <h4>Yesterday</h4>
                            <div className="SingleChat-line"></div>
                          </div>
                          {messageJSX}
                        </div>
                    }
                    else if (nextDate !== curDate) {
                      messageJSX =
                        <div key={i} className="SingleChat-single-message-container">
                          <div className="SingleChat-time">
                            <h4>{moment(message.createdAt).format('MMMM Do')}</h4>
                            <div className="SingleChat-line"></div>
                          </div>
                          {messageJSX}
                        </div>
                    }
                  }

                  return messageJSX;
                })
            : null
          }
        </div>

        <div className="SingleChat-typing-container">
          {
            this.props.singleChat ?
              this.props.chatsWithTyping.includes(this.props.chatId) ?
                <div className="SingleChat-typing">
                  <p>Typing...</p>
                </div>
              : null
            : null
          }
        </div>

        <div className="SingleChat-form-container">
          <form onSubmit={this.handleSendMessage.bind(this)} ref="messageForm">
            <input
              onBlur={() => this.handleTyping(false)}
              onChange={() => this.handleTyping(true)}
              type="text"
              ref="msg"
              placeholder="Send a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default wrapSingleChat(SingleChat);
