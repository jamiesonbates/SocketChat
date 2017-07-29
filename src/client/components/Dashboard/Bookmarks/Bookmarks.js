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
      nextCategory: '',
      deleteCatIdFocused: null
    }

    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleMsgClick = this.handleMsgClick.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleDeleteFocus = this.handleDeleteFocus.bind(this);
    this.handleDeleteCat = this.handleDeleteCat.bind(this);
  }

  handleDeleteCat(catId) {
    this.props.deleteCategory(catId);
    this.setState({ deleteCatIdFocused: null });
  }

  handleDeleteFocus(catId) {
    this.setState(prevState => {
      if (prevState.deleteCatIdFocused) {
        return { deleteCatIdFocused: null };
      }
      else {
        return { deleteCatIdFocused: catId };
      }
    });
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
    this.props.addCategory(this.state.nextCategory);
    this.setState({ nextCategory: '' });
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
                  value={this.state.nextCategory}
                />
                <button type="submit">Create</button>
              </form>
            </div>
            : null
          }
        </div>


        <div className="Bookmarks-list-canvas">
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
                            className={category.catId === 11 ? 'Bookmarks-category-privacy always-private' : 'Bookmarks-category-privacy'}
                            onClick={category.catId === 11 ? null : () => this.handlePrivacyChange(category)}
                          >
                            {category.privacy ? <FaOpen /> : <FaLocked />}
                            {
                              category.catId === 11 ?
                                <p>Always Private</p>
                              : <p>{category.privacy ? 'Public' : 'Private'}</p>
                            }
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
                              <div className="Bookmarks-message-card">
                                <p className="Bookmarks-message-text">
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
                          </div>
                        ))
                      : <p className="Bookmarks-default-msg">No bookmarks here yet.</p>
                    }

                    {
                      this.props.currentUserId === this.props.targetBookmarksId && category.catId !== 11 ?
                        <button
                          className="Bookmarks-category-delete"
                          onClick={() => this.handleDeleteFocus(category.catId)}
                        >
                          Delete Category
                        </button>
                      : null
                    }

                    {
                      category.catId === this.state.deleteCatIdFocused &&   this.props.currentUserId === this.props.targetBookmarksId && category.catId !== 11 ?
                        <div className="Bookmarks-category-delete-danger">
                          <h4>Danger Zone</h4>
                          <p>Do you want to delete this category and all the bookmarks within it?</p>
                          <div>
                            <button
                              onClick={() => this.handleDeleteCat(category.catId)}
                            >
                              Yes
                            </button>

                            <button onClick={() => this.handleDeleteFocus(null)}
                            >
                              No, leave danger zone
                            </button>
                          </div>
                        </div>
                      : null
                    }
                  </div>
                ))
              : <p className="Bookmarks-default-msg">
                  This persons categories are private.
                </p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default passPropsByUser(Bookmarks);
