import React from 'react';
import moment from 'moment';

import './LastMessage.css';

const LastMessage = ({ user, lastMessage }) => (
  <div className="LastMessage-container">
    <p className="LastMessage">
      {
        user ?
          `${user.firstName}:`
        : ''
      } {lastMessage}
    </p>
  </div>
)

export default LastMessage;
