import React from 'react';
import moment from 'moment';
import FaChat from 'react-icons/lib/ti/message';

import './ChatsPre.scss';

const ChatsPre = ({ chats, determineChatHeader, handleChatClick }) => {
  return (
    <div className="DefaultMain-recent">
      <div className="DefaultMain-recent-header">
        <h3>Recent Chat Activity</h3>
      </div>
      {
        chats ?
          chats.map((chat, i) => (
            <div
              className="ChatsPre-chat"
              key={i}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="ChatsPre-chat-top">
                <div>
                  <FaChat className="ChatsPre-chat-icon" />
                  <p className="ChatsPre-chat-header">
                  {determineChatHeader(chat)}
                </p>
                </div>
                <p className="ChatsPre-time">
                  {moment(chat.lastActivity).fromNow(true)}
                </p>
              </div>
              <div className="ChatsPre-chat-bottom">
                <p>{chat.count > 0 ?
                      chat.count > 1 ?
                        `${chat.count} new messages`
                      : `${chat.count} new message`
                    : `You're up to date`
                  }
                </p>
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
