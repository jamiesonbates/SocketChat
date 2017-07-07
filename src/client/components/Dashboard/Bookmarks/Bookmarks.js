import React from 'react';
import FaMessage from 'react-icons/lib/md/message';
import FaTrash from 'react-icons/lib/md/delete';
import FaPerson from 'react-icons/lib/md/person';
import FaSingleOpts from 'react-icons/lib/fa/angle-up';
import FaClose from 'react-icons/lib/md/close';

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

  render() {
    return (
      <div className="Bookmarks-container">
        <h2>Bookmarks</h2>

        <div className="Bookmarks-list">
          {
            this.props.bookmarks.map((category, i) => (
              <div key={i} className="Bookmarks-category">
                <h3>{category.catName}</h3>

                {
                  category.messages ?
                    category.messages.map((msg, i) => (
                      <div key={i} className={
                        this.state.clickedId === msg.messageId ?
                          'Bookmarks-message Bookmark-clicked'
                        : 'Bookmarks-message'

                      }>
                        <div className="Bookmarks-message-container">
                          <p>{msg.message}</p>

                          {
                            this.state.clickedId === msg.messageId ?
                              <FaClose
                                className="Bookmarks-icon"
                                onClick={() => this.handleMsgClick(null)}
                              />
                            :  <FaSingleOpts
                                className="Bookmarks-icon Bookmarks-icon-singleopts"
                                onClick={() => this.handleMsgClick(msg.messageId)}
                              />
                          }
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
