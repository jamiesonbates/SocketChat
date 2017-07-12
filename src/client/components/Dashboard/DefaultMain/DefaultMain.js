import React from 'react';
import moment from 'moment';

import BookmarksPre from './BookmarksPre/BookmarksPre';
import ChatsPre from './ChatsPre/ChatsPre';
import './DefaultMain.scss';
import wrapDefaultMain from '../../../containers/WrapDefaultMain';
import { showChatType } from '../../../state/actionTypes';

class DefaultMain extends React.Component {
  constructor(props) {
    super(props);

    this.mostRecentChats = this.mostRecentChats.bind(this);
  }

  componentWillMount() {
    this.props.getRecentBookmarks();
  }

  mostRecentChats() {
    if (!this.props.allChats) {
      return null;
    }

    const chats = [...this.props.allChats].sort((a, b) => {
      const aMil = moment(a.lastActivity).valueOf();
      const bMil = moment(b.lastActivity).valueOf();

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

    return chats;
  }

  handleChatClick(chatId) {
    this.props.setChat(chatId);
    this.props.updateMain(showChatType);
  }

  render() {
    return (
      <div className="DefaultMain-container">
        <div className="DefaultMain-header">
          Hello
        </div>

        <div className="DefaultMain-recent">
          <ChatsPre
            chats={this.mostRecentChats()}
            handleChatClick={this.handleChatClick.bind(this)}
            determineChatHeader={this.props.determineChatHeader.bind(this)}
          />

          <BookmarksPre
            recentBookmarks={this.props.recentBookmarks}
          />
        </div>
      </div>
    )
  }
}

export default wrapDefaultMain(DefaultMain);
