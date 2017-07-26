import React from 'react';
import moment from 'moment';
import FaMessage from 'react-icons/lib/md/message';
import FaTrash from 'react-icons/lib/md/delete';
import FaPerson from 'react-icons/lib/md/person';
import FaSingleOpts from 'react-icons/lib/fa/angle-up';
import FaClose from 'react-icons/lib/md/close';
import FaBookmark from 'react-icons/lib/ti/bookmark';
import FaStarburst from 'react-icons/lib/ti/starburst-outline';
import FaArrow from 'react-icons/lib/ti/arrow-right-thick';
import FaLocked from 'react-icons/lib/ti/lock-closed';
import FaOpen from 'react-icons/lib/ti/lock-open';

import './Bookmarks.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';
import { showChatType } from '../../../state/actionTypes';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedId: null,
      nextCategory: null
    }

    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleMsgClick = this.handleMsgClick.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
  }

  handleMsgClick(id) {
    this.setState({ clickedId: id });
  }

  handleBookmarkClick(chatId) {
    this.props.setChat(chatId);
  }

  handleMsgUnbookmark(starredMessagesId) {
    this.props.unBookmarkMsg(starredMessagesId);
  }

  handleCategoryChange(e) {
    this.setState({ nextCategory: e.target.value });
  }

  handleSubmitCategory(e) {
    e.preventDefault();

    this.setState({ nextCategory: null });
  }

  handlePrivacyChange(category) {
    const { catId, privacy } = category;

    this.props.updateCategoryPrivacy({ catId, privacy });
  }

  componentWillUnmount() {
    this.props.resetBookmarks();
    this.props.resetTargetBookmarksId();
  }

  render() {
    return (
      <div className="Bookmarks-container">
        <div className="Bookmarks-header">
          <div className="Bookmarks-title-container">
            <FaBookmark className="Bookmarks-header-icon"/>
            <h2>
              {
                this.props.currentUserId === this.props.targetBookmarksId ?
                  'Your Bookmarks'
                : 'Bookmarks'
              }
            </h2>
          </div>
          {
            this.props.currentUserId === this.props.targetBookmarksId ?
            <div className="Bookmarks-create-category">
              <form onSubmit={this.handleSubmitCategory}>
                <input
                  type="text"
                  placeholder="Create a category"
                  onChange={this.handleCategoryChange}
                />
                <button type="submit">Create</button>
              </form>
            </div>
            : null
          }
        </div>


        <div className="Bookmarks-list">
          {
            this.props.bookmarks.length ?
              this.props.bookmarks.map((category, i) => (
                <div key={i} className="Bookmarks-category">
                  <div className="Bookmarks-category-header">
                    <div className="Bookmarks-category-title">
                      <FaStarburst className="Bookmarks-icon"/>
                      <h3>{category.catName}</h3>
                    </div>

                    {
                      this.props.currentUserId === this.props.targetBookmarksId ?
                        <div
                          className="Bookmarks-category-privacy"
                          onClick={() => this.handlePrivacyChange(category)}
                        >
                          {category.privacy ? <FaOpen /> : <FaLocked />}
                          <p>{category.privacy ? 'Public' : 'Private'}</p>
                        </div>
                      : null
                    }
                  </div>

                  {
                    category.messages ?
                      category.messages.map((msg, i) => (
                        <div
                          key={i}
                          className="Bookmarks-message-container"
                          onClick={() => this.handleBookmarkClick(msg.chatId)}
                        >
                          <div className="Bookmarks-message">

                            <div>
                              <p>
                                {

                                  this.props.currentUserId === msg.userId ?
                                    <span className="Bookmarks-author">
                                      You said:
                                    </span>
                                  : <span
                                      className="Bookmarks-author">
                                      {msg.firstName} {msg.lastName} said:
                                    </span>
                                } {msg.message}
                              </p>

                              <p className="Bookmarks-date">
                                Bookmarked on: {moment(msg.starred_at).format('M/D/YY')}
                              </p>
                            </div>
                          </div>

                          {
                            this.state.clickedId === msg.messageId ?
                              <div className="Bookmarks-message-tools">
                                <FaMessage className="Bookmarks-icon Boomarks-icon-message"/>
                                <FaPerson className="Bookmarks-icon Bookmarks-icon-person" />
                                <FaTrash
                                  className="Bookmarks-icon Bookmarks-icon-trash"
                                  onClick={() => this.handleMsgUnbookmark(msg.starredMessageId)}
                                />
                              </div>
                            : null
                          }
                        </div>
                      ))
                    : <p className="Bookmarks-default-msg">No bookmarks here yet.</p>
                  }
                </div>
              ))
            : <p className="Bookmarks-default-msg">This persons categories are private.</p>
          }
        </div>
      </div>
    )
  }
}

export default passPropsByUser(Bookmarks);
