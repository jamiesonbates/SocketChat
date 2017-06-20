import React from 'react';
import moment from 'moment';

import './LastMessage.css';

const LastMessage = ({ lastMessage }) => (
  <div className="LastMessage-container">
    <p className="LastMessage">
      { lastMessage }
    </p>
  </div>
)

export default LastMessage;
