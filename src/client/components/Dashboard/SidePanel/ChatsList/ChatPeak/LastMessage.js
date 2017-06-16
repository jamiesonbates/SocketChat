import React from 'react';
import moment from 'moment';

import './LastMessage.css';

const LastMessage = ({ lastMessage, user, userId }) => (
  <div className="LastMessage-container">
    <p className="LastMessage">
      {user.id === userId ? 'You' : user.firstName }: {lastMessage.message}
    </p>
  </div>
)

export default LastMessage;
