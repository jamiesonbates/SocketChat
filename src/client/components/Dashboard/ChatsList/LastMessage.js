import React from 'react';

const LastMessage = ({ messages }) => {
  const msg = messages[messages.length - 1].message;

  return (
    <p className="ChatsList-last-message">{msg}</p>
  )
}

export default LastMessage;
