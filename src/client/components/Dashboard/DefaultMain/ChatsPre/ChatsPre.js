import React from 'react';
import moment from 'moment';

import './ChatsPre.scss';

const ChatsPre = ({ chats }) => {
  return (
    <div>
      {
        chats ?
          chats.map((chat, i) => (
            <div key={i}>
              {chat.id} {chat.last_activity}
            </div>
          ))
        : null
      }
    </div>
  )
}

export default ChatsPre;
