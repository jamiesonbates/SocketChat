import React from 'react';
import moment from 'moment';

import './ChatsPre.scss';

const ChatsPre = ({ chats, determineChatHeader, handleChatClick }) => {
  console.log(chats);
  return (
    <div className="DefaultMain-recent-container">
      <h3>Recent Chat Activity</h3>
      {
        chats ?
          chats.map((chat, i) => (
            <div
              className="ChatsPre-chat"
              key={i}
              onClick={() => handleChatClick(chat.id)}
            >
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
        : <div className="ChatsPre-chat">
            <p>You haven't started any chats yet.</p>
          </div>
      }
    </div>
  )
}

export default ChatsPre;
