import React from 'react';
import moment from 'moment';

import BookmarksPre from './BookmarksPre/BookmarksPre';
import ChatsPre from './ChatsPre/ChatsPre';
import './DefaultMain.scss';
import wrapDefaultMain from '../../../containers/WrapDefaultMain';

class DefaultMain extends React.Component {
  constructor(props) {
    super(props);

    this.mostRecentChats = this.mostRecentChats.bind(this);
  }

  mostRecentChats() {
    if (!this.props.allChats) {
      return;
    }

    const chats = [...this.props.allChats].sort((a, b) => {
      const aMil = moment(a.lastActivity).valueOf();
      const bMil = moment(b.lastActivity).valueOf();
      console.log(aMil > bMil);

      if (aMil < bMil) {
        return 1;
      }
      else if (aMil > bMil) {
        return -1;
      }
      else {
        return 0;
      }
    }).slice(0, 5);

    console.log(chats);

    return chats;
  }

  mostRecentBookmarks() {
    return this.props.bookmarks;
  }

  render() {
    return (
      <div className="DefaultMain-container">
        <div className="DefaultMain-header">
          Hello
        </div>

        <ChatsPre
          chats={this.mostRecentChats()}
        />

        <BookmarksPre
          mostRecentBookmarks={this.mostRecentBookmarks.bind(this)}
        />
      </div>
    )
  }
}

export default wrapDefaultMain(DefaultMain);
