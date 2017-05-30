import React from 'react';
import io from 'socket.io-client';
const socket = io();

import './SingleChat.css';
import wrapDash from '../../../containers/WrapDash';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(e) {
    e.preventDefault();
    const message = this.refs.msg.value;
    const userId = this.props.userId;
    const chatId = this.props.singleChat;

    socket.emit('msg', { message, userId, chatId });

    this.refs.messageForm.reset();
  }

  componentWillReceiveProps(props) {
    console.log(props);
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

                  return acc.messages;
                }).map((message, i) => (
                  <p key={i}>{message.message}</p>
                ))
              : null
          }
        </div>

        <div className="SingleChat-form-container">
          <form onSubmit={this.sendMessage.bind(this)} ref="messageForm">
            <input type="text" ref="msg" placeholder="Send a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default wrapDash(SingleChat);
