import React from 'react';
import moment from 'moment';
import FaBookmark from 'react-icons/lib/md/bookmark';

const Message = ({
  message,
  messagePositionClass,
  messageColorClass,
  user,
  userIsOnline,
  starred,
  handleBookmarking
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

          <FaBookmark
            className={
              starred ?
                'SingleChat-bookmark-icon SingleChat-starred'
              : 'SingleChat-bookmark-icon'
            }
            onClick={() => handleBookmarking(message.id)}
          />
        </div>
      : <div className="SingleChat-message-info">
          <p className="SingleChat-time-message">
            {moment(message.createdAt).format('H:mm A')}
          </p>

          <FaBookmark
            className={
              starred ?
                'SingleChat-bookmark-icon SingleChat-starred'
              : 'SingleChat-bookmark-icon'
            }
            onClick={() => handleBookmarking(message.id)}
          />
        </div>
    }
    <p className={`${messageColorClass} SingleChat-message`}>{message.message}</p>
  </div>
)

export default Message;
