import React from 'react';
import moment from 'moment';

const Message = ({
  message,
  messagePositionClass,
  messageColorClass,
  user,
  userIsOnline
}) => (
  <div className={messagePositionClass}>
    {
      user ?
        <div className="SingleChat-message-info">
          <p className="SingleChat-user-message">
            {`${user.firstName} ${user.lastName}`}
          </p>

          <p className="SingleChat-time-message">
            {moment(message.createdAt).format('H:mm A')}
          </p>
        </div>
      : <p className="SingleChat-time-message">
          {moment(message.createdAt).format('H:mm A')}
        </p>
    }
    <p className={`${messageColorClass} SingleChat-message`}>{message.message}</p>
  </div>
)

export default Message;
