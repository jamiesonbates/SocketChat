import React from 'react';

const Message = ({
  message,
  messagePositionClass,
  messageColorClass,
  user,
  userIsOnline
}) => {
  console.log(user);
  console.log(userIsOnline);

return (
  <div className={messagePositionClass}>
    <div className="SingleChat-message-info">
      {
        user ?
          <p className="SingleChat-user">
            {`${user.firstName} ${user.lastName}`}
          </p>
        : null
      }
      {
        userIsOnline ?
          <div className="SingleChat-userIsOnline"></div>
        : null
      }
    </div>
    <p className={`${messageColorClass} SingleChat-message`}>{message}</p>
  </div>
)
}

export default Message;
