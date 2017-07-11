import React from 'react';
import moment from 'moment';

import './ChatsPre.scss';

const ChatsPre = ({ chats, determineChatHeader }) => {
  return (
    <div className="ChatsPre-container">
      <h3>Recent Chat Activity</h3>
      {
        chats ?
          chats.map((chat, i) => (
            <div className="ChatsPre-chat" key={i}>
              <p>{determineChatHeader(chat)}</p>
              <p>Active {moment(chat.lastActivity).fromNow()}</p>
            </div>
          ))
        : null
      }
    </div>
  )
}

export default ChatsPre;
