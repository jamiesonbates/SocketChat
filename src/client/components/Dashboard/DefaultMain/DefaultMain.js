import React from 'react';

import BookmarksPre from './BookmarksPre/BookmarksPre';
import ChatsPre from './ChatsPre/ChatsPre';
import './DefaultMain.scss';

class DefaultMain extends React.Component {
  constructor(props) {
    super(props);
  }

  mostRecentChats() {

  }

  mostRecentBookmarks() {
    
  }

  render() {
    return (
      <div className="DefaultMain-container">
        <div className="DefaultMain-header">

        </div>

        <ChatsPre />
        <BookmarksPre />
      </div>
    )
  }
}

export default DefaultMain;
