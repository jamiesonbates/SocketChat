import React from 'react';

import './ChatsList.css';

class ChatsList extends React.Component {
  render() {
    return (
      <div className="ChatsList-container">
        <div className="ChatsList-header">
          <h2>ChatsList</h2>
        </div>
          {
            this.props.chats
              ? this.props.chats.map((chat, i) => (
                  <div key={i} className="ChatsList-chat">
                    <p>{chat.name}</p>
                  </div>
                ))
              : null
          }
      </div>
    )
  }
}

export default ChatsList;
