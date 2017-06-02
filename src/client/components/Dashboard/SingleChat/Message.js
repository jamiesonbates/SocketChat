import React from 'react';

const Message = ({ message, messageClass }) => (
  <div className={messageClass}>
    <p>{message}</p>
  </div>
)

export default Message;
