import React from 'react';
import moment from 'moment';
import FaMessage from 'react-icons/lib/md/message';
import FaTrash from 'react-icons/lib/md/delete';
import FaPerson from 'react-icons/lib/md/person';
import FaSingleOpts from 'react-icons/lib/fa/angle-up';
import FaClose from 'react-icons/lib/md/close';
import FaBookmark from 'react-icons/lib/ti/bookmark';
import FaStarburst from 'react-icons/lib/ti/starburst-outline';

import './Bookmarks.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedId: null
    }

    this.handleMsgClick = this.handleMsgClick.bind(this);
  }

  handleMsgClick(id) {
    this.setState({ clickedId: id });
  }

  handleMsgUnbookmark(starredMessagesId) {
    this.props.unBookmarkMsg(starredMessagesId);
  }

  componentWillUnmount() {
    this.props.resetBookmarks();
    this.props.resetTargetBookmarksId();
  }

  render() {
    return (
      <div className="Bookmarks-container">
        <div className="Bookmarks-header">
          <FaBookmark className="Bookmarks-header-icon"/>
          <h2>Bookmarks</h2>
        </div>

        <div className="Bookmarks-list">
          {
            this.props.bookmarks.map((category, i) => (
              <div key={i} className="Bookmarks-category">
                <div className="Bookmarks-category-header">
                  <FaStarburst className="Bookmarks-icon"/>
                  <h3>{category.catName}</h3>
                </div>

                {
                  category.messages ?
                    category.messages.map((msg, i) => (
                      <div key={i} className="Bookmarks-message-container">
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

                          {/* {
                            this.state.clickedId === msg.messageId ?
                              <FaClose
                                className="Bookmarks-icon"
                                onClick={() => this.handleMsgClick(null)}
                              />
                            :  <FaSingleOpts
                                className="Bookmarks-icon Bookmarks-icon-singleopts"
                                onClick={() => this.handleMsgClick(msg.messageId)}
                              />
                          } */}
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
                  : null
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default passPropsByUser(Bookmarks);
