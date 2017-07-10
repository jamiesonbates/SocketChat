import React from 'react';
import moment from 'moment';
import FaBookmark from 'react-icons/lib/md/bookmark';

import CreateBookmark from './CreateBookmark';

const Message = ({
  message,
  messagePositionClass,
  messageColorClass,
  user,
  userIsOnline,
  starred,
  handleBookmarking,
  handleNewBookmark,
  bookmarkMsgId,
  categories,
  handleExitBookmarking,
  bookmarkMsg
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
              : bookmarkMsgId === message.id ?
                  'SingleChat-bookmark-icon bookmarking'
                  : 'SingleChat-bookmark-icon'
            }
            onClick={() => handleBookmarking(message.id)}
          />

          {
            bookmarkMsgId === message.id ?
              <CreateBookmark
                categories={categories}
                messageId={message.id}
                handleExitBookmarking={handleExitBookmarking}
                bookmarkMsg={bookmarkMsg}
              />
            : null
          }
        </div>
      : <div className="SingleChat-message-info">
          <p className="SingleChat-time-message">
            {moment(message.createdAt).format('H:mm A')}
          </p>

          <FaBookmark
            className={
              starred ?
                'SingleChat-bookmark-icon SingleChat-starred'
              : bookmarkMsgId === message.id ?
                  'SingleChat-bookmark-icon bookmarking'
                  : 'SingleChat-bookmark-icon'
            }
            onClick={() => handleBookmarking(message.id)}
          />

          {
            bookmarkMsgId === message.id ?
              <CreateBookmark
                categories={categories}
                messageId={message.id}
                handleExitBookmarking={handleExitBookmarking}
                bookmarkMsg={bookmarkMsg}
              />
            : null
          }
        </div>
    }
    <p className={`${messageColorClass} SingleChat-message-text`}>{message.message}</p>
  </div>
)

export default Message;
