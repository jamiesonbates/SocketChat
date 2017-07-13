import React from 'react';
import moment from 'moment';

import './LastMessage.css';

const LastMessage = ({ lastMessage, highlight }) => (
  <div className="LastMessage-container">
    <p className={ highlight ? `LastMessage highlight` : 'LastMessage'}>
      {lastMessage }
    </p>
  </div>
)

export default LastMessage;
