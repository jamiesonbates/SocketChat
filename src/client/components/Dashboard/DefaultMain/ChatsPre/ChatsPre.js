import React from 'react';
import moment from 'moment';

import './ChatsPre.scss';

const ChatsPre = ({ chats, determineChatHeader }) => {
  console.log(chats);
  return (
    <div className="DefaultMain-recent-container">
      <h3>Recent Chat Activity</h3>
      {
        chats ?
          chats.map((chat, i) => (
            <div className="ChatsPre-chat" key={i}>
              <div className="ChatsPre-chat-top">
                <p>{determineChatHeader(chat)}</p>
                <p className="ChatsPre-time">
                  {moment(chat.lastActivity).fromNow(true)}
                </p>
              </div>
              <div className="ChatsPre-chat-bottom">
                <p>{'<X> number of new messages'}</p>
              </div>
            </div>
          ))
        : null
      }
    </div>
  )
}

export default ChatsPre;
