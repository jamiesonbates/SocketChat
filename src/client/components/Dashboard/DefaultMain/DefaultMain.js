import React from 'react';
import moment from 'moment';
import FaHome from 'react-icons/lib/ti/home-outline';

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
    this.props.updateChatSeen({ chatId, silent: false });
  }

  handleBookmarkClick() {
    const userId = this.props.userId;

    this.props.setBookmarks({ userId });
  }

  render() {
    return (
      <div className="DefaultMain-container">
        <div className="DefaultMain-header">
          <FaHome className="DefaultMain-home-icon"/>
          <h2>Welcome {this.props.userInfo.firstName}!</h2>
        </div>

        <div className="DefaultMain-recent-container">
          <ChatsPre
            chats={this.mostRecentChats()}
            handleChatClick={this.handleChatClick.bind(this)}
            determineChatHeader={this.props.determineChatHeader.bind(this)}
          />

          <BookmarksPre
            recentBookmarks={this.props.recentBookmarks}
            handleBookmarkClick={this.handleBookmarkClick.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default wrapDefaultMain(DefaultMain);
