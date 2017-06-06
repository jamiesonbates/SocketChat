import React from 'react';

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
    const chatId = this.props.singleChat;

    this.props.dispatch(this.props.sendMessage(message, userId, chatId));
    this.props.dispatch(this.props.stoppedTyping(chatId));
    this.refs.messageForm.reset();
  }

  handleTyping(isTyping) {
    const chatId = this.props.singleChat;

    if (isTyping) {
      this.props.dispatch(this.props.startedTyping(chatId));
    }
    else {
      this.props.dispatch(this.props.stoppedTyping(chatId));
    }
  }

  userIsOnline(userId) {
    console.log(this.props.usersOnline);
    const bool = this.props.usersOnline.reduce((acc, id) => {
      console.log(id, '=', userId);
      console.log(id === userId);
      if (id === userId) {
        acc = true;
      }

      return acc;
    }, false);

    console.log(bool);

    return bool;
  }

  findUserName(userId) {
    const user = this.props.singleChat.users.filter(user => {
      if (user.id === userId) {
        return true;
      }

      return false;
    })[0];

    console.log(user);

    return user;
  }

  render() {
    return (
      <div className="SingleChat-container">
        <div className="SingleChat-messages-container">

        <h2>SingleChat</h2>
          {
            this.props.singleChat ?
                this.props.singleChat.messages.map((message, i) => (
                  <div key={i} className="SingleChat-message">
                    {
                      message.userId === this.props.userId ?
                        <Message
                          messagePositionClass={'SingleChat-message-position-currentUser'}
                          messageColorClass={'SingleChat-message-color-currentUser'}
                          message={message.message}
                          user={null}
                          userIsOnline={false}
                        />
                      :
                        <Message
                          messagePositionClass={'SingleChat-message-position-otherUser'}
                          messageColorClass={'SingleChat-message-color-otherUser'}
                          message={message.message}
                          user={this.findUserName(message.userId)}
                          userIsOnline={this.userIsOnline(message.userId)}
                        />
                    }
                  </div>
                ))
            : null
          }
        </div>

        {
          this.props.chatsWithTyping.includes(this.props.singleChat) ?
            <Typing />
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
