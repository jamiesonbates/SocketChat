import React from 'react';

import './ChatsList.css';

class ChatsList extends React.Component {
  render() {
    return (
      <div className="ChatsList-container">
        <h2>ChatsList</h2>
          {
            this.props.chats
              ? this.props.chats.map((chat, i) => (
                  <div key={i}>
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
