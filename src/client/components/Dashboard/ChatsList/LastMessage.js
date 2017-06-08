import React from 'react';
import moment from 'moment';

const LastMessage = ({ lastMessage, user, userId }) => (
  <div className="ChatsList-lastMessage-container">
    <p className="ChatsList-lastMessage">
      {user.id === userId ? 'You' : user.firstName }: {lastMessage.message}
    </p>
  </div>
)

export default LastMessage;
