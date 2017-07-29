import React from 'react';
import moment from 'moment';
import FaBookmark from 'react-icons/lib/ti/bookmark';

import Utilities from '../../../utilities/Utilities';
import CreateBookmark from './CreateBookmark';
import UserIdentifier from '../UserIdentifier/UserIdentifier';

const Message = ({
  message,
  messageClass,
  messageColor,
  user,
  userIsOnline,
  starred,
  handleBookmarking,
  handleNewBookmark,
  bookmarkMsgId,
  categories,
  handleExitBookmarking,
  bookmarkMsg,
  updateMain,
  updateTargetUserId
}) => (
  <div className={messageClass}>
    {
      user ?
        <div className="SingleChat-message-info">
          <UserIdentifier
            userId={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            updateMain={updateMain}
            updateTargetUserId={updateTargetUserId}
          />

          <p className="SingleChat-time-message">
            {moment(message.createdAt).format('h:mm A')}
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
      : <div className={
          user ? 'SingleChat-message-info' : 'SingleChat-message-info curUser'
        }>
          <p className="SingleChat-time-message">
            {moment(message.createdAt).format('h:mm A')}
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
    <div className="SingleChat-message-text-container">
      <p className={`${messageColor} SingleChat-message-text`}>
        {message.message}
      </p>
    </div>
  </div>
)

export default Message;
