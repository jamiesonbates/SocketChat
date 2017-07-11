import React from 'react';

import BookmarksPre from './BookmarksPre/BookmarksPre';
import ChatsPre from './ChatsPre/ChatsPre';
import './DefaultMain.scss';
import wrapDefaultMain from '../../../containers/WrapDefaultMain';

class DefaultMain extends React.Component {
  constructor(props) {
    super(props);
  }

  mostRecentChats() {
    return this.props.allChats;
  }

  mostRecentBookmarks() {
    return this.props.bookmarks;
  }

  render() {
    return (
      <div className="DefaultMain-container">
        <div className="DefaultMain-header">

        </div>

        <ChatsPre
          mostRecentChats={this.mostRecentChats.bind(this)}
        />
        <BookmarksPre
          mostRecentBookmarks={this.mostRecentBookmarks.bind(this)}
        />
      </div>
    )
  }
}

export default wrapDefaultMain(DefaultMain);
