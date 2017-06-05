import React from 'react';

import './SingleChat.css';
import wrapDash from '../../../containers/WrapDash';
import Message from './Message';
import Typing from './Typing';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);

    this.handleTyping = this.handleTyping.bind(this);

    console.log(this.props.singleChat);
    console.log(this.props.chatsWithTyping);
    console.log(this.props.chatsWithTyping.includes(this.props.singleChat));
  }

  sendMessage(e) {
    e.preventDefault();
    const message = this.refs.msg.value;
    const userId = this.props.userId;
    const chatId = this.props.singleChat;

    this.props.dispatch(this.props.sendMessage(message, userId, chatId));
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

  componentWillReceiveProps(props) {
    console.log(props.singleChat);
    console.log(props.chatsWithTyping);
    console.log(props.chatsWithTyping.includes(props.singleChat));
  }

  render() {
    return (
      <div className="SingleChat-container">
        <div className="SingleChat-messages-container">

        <h2>SingleChat</h2>
          {
            this.props.singleChat ?
              this.props.allChats
                .reduce((acc, chat) => {
                  if (chat.id === this.props.singleChat) {
                    acc = chat;
                  }

                  return acc;
                })
                .messages
                .map((message, i) => (
                  <div key={i} className="SingleChat-message">
                    {
                      message.userId === this.props.userId ?
                        <Message
                          messageClass={'SingleChat-message-currentUser'}
                          message={message.message}
                        />
                      :
                        <Message
                          messageClass={'SingleChat-message-otherUser'}
                          message={message.message}
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
            <input onChange={() => this.handleTyping(true)} type="text" ref="msg" placeholder="Send a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default wrapDash(SingleChat);
