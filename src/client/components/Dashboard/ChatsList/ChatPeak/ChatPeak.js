import React from 'react';

import LastMessage from './LastMessage';

const ChatPeak = ({ chat, userId, determineChatHeader, findUserName }) => (
  <div>
    <div>
      <p>{determineChatHeader(chat)}</p>

      <LastMessage
        lastMessage={chat.messages[chat.messages.length - 1]}
        user={findUserName(chat.messages[chat.messages.length - 1].userId, chat)}
        userId={userId}
      />
    </div>
  </div>
)

export default ChatPeak;
