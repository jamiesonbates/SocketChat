import React from 'react';
import FaMessage from 'react-icons/lib/fa/comment';
import FaUsers from 'react-icons/lib/fa/user-plus';
import FaUser from 'react-icons/lib/fa/user';

import './SingleChat.css';
import wrapDash from '../../../containers/WrapDash';
import Message from './Message';
import Typing from './Typing';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.handleTyping = this.handleTyping.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    const message = this.refs.msg.value;
    const userId = this.props.userId;
    const chatId = this.props.singleChat.id;

    this.props.dispatch(this.props.sendMessage(message, userId, chatId));
    this.props.dispatch(this.props.stoppedTyping(chatId));
    this.refs.messageForm.reset();
  }

  handleTyping(isTyping) {
    const chatId = this.props.singleChat.id;

    if (isTyping) {
      this.props.dispatch(this.props.startedTyping(chatId));
    }
    else {
      this.props.dispatch(this.props.stoppedTyping(chatId));
    }
  }

  userIsOnline(userId) {
    const bool = this.props.usersOnline.reduce((acc, id) => {
      if (id === userId) {
        acc = true;
      }

      return acc;
    }, false);

    return bool;
  }

  findUserName(userId) {
    const user = this.props.singleChat.users.filter(user => {
      if (user.id === userId) {
        return true;
      }

      return false;
    })[0];
    return user;
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
              this.props.singleChat && this.props.singleChat.users.length < 3 ?
                this.props.singleChat.users.map((user, i) => (
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
              this.props.singleChat && this.props.singleChat.users.length > 2 ?
                this.props.singleChat.users.map((user, i) => {
                  if (user.id === this.props.userId) {
                    return null;
                  }

                  return (
                    <div key={i} className="SingleChat-user">
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
            this.props.singleChat ?
                this.props.singleChat.messages.map((message, i) => (
                  <div key={i} className="SingleChat-message">
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
                          user={this.findUserName(message.userId)}
                        />
                    }
                  </div>
                ))
            : null
          }
        </div>

        {
          this.props.singleChat ?
            this.props.chatsWithTyping.includes(this.props.singleChat.id) ?
              <div className="SingleChat-typing">
                <p>Typing</p>
              </div>
            : null
          : null
        }

        <div className="SingleChat-form-container">
          <form onSubmit={this.sendMessage.bind(this)} ref="messageForm">
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

export default wrapDash(SingleChat);
