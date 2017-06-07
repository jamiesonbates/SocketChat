import React from 'react';

const Message = ({
  message,
  messagePositionClass,
  messageColorClass,
  user,
  userIsOnline
}) => (
  <div className={messagePositionClass}>
    <div className="SingleChat-message-info">
      {
        user ?
          <p className="SingleChat-user-message">
            {`${user.firstName} ${user.lastName}`}
          </p>
        : null
      }
    </div>
    <p className={`${messageColorClass} SingleChat-message`}>{message}</p>
  </div>
)

export default Message;
