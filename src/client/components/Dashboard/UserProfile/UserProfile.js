import React from 'react';
import FaUser from 'react-icons/lib/fa/user';
import FaClose from 'react-icons/lib/md/close';

import './UserProfile.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleMessageClick = this.handleMessageClick.bind(this);
  }

  componentWillMount() {
    if (!this.props.targetUserProfile) {
      this.props.updateUserProfile(this.props.targetUserId);
    }
  }

  userIsOnline(userId) {
    const bool = this.props.usersOnline.reduce((acc, id) => {
      if (id === userId) {
        acc = true;
      }

      return acc;
    }, false);

    return bool;
  }

  handleMessageClick(userId) {
    let chatId;

    const chatExists = this.props.allChats.filter(chat => {
      if (chat.users.length < 3) {
        return true;
      }
      else {
        return false;
      }
    })
    .reduce((acc, chat) => {
      for (const user of chat.users) {
        if (user.id === userId) {
          chatId = chat.id;
          acc = true;
          return acc;
        }
      }

      return acc;
    }, false);

    if (chatExists) {
      this.props.setChat(chatId);
    }
    else {
      this.props.createChat([userId]);
    }
  }

  render() {
    return (
      <div className="UserProfile-container">
        <div className="UserProfile-nav">
          <FaClose className="UserProfile-close-icon"/>
        </div>
        {
          this.props.targetUserProfile ?
            <div className="UserProfile-main">
              <div className="UserProfile-top">
                <FaUser className="UserProfile-user-icon" />

                <div className="UserProfile-name">
                  <h3>
                    {this.props.targetUserProfile.firstName} {this.props.targetUserProfile.lastName}
                  </h3>
                  {
                    this.userIsOnline(this.props.targetUserId) ?
                      <div className="UserProfile-online"></div>
                    : <div className="UserProfile-not-online"></div>
                  }
                </div>

                {
                  this.props.currentUserId === this.props.targetUserId ?
                    <div className="UserProfile-options">
                      <button className="UserProfile-btn">
                        Bookmarks
                      </button>

                      <button className="UserProfile-btn">
                        Edit
                      </button>
                    </div>
                  : <div className="UserProfile-options">
                      <button
                        className="UserProfile-btn"
                        onClick={() => this.handleMessageClick(this.props.targetUserId)}
                      >
                        Message
                      </button>

                      <button className="UserProfile-btn">
                        Bookmarks
                      </button>
                    </div>
                }
              </div>

              <div className="UserProfile-bottom">
                <div className="UserProfile-info-container">
                  <p className="UserProfile-title">Username</p>
                  <p className="UserProfile-info">
                    {this.props.targetUserProfile.username}
                  </p>
                </div>

                <div className="UserProfile-info-container">
                  <p className="UserProfile-title">Email</p>
                  <p className="UserProfile-info">
                    {this.props.targetUserProfile.email}
                  </p>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    )
  }
}

export default passPropsByUser(UserProfile);
