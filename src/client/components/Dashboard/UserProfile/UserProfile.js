import React from 'react';
import FaUser from 'react-icons/lib/fa/user';
import FaClose from 'react-icons/lib/md/close';
import FaArrow from 'react-icons/lib/md/arrow-back';

import './UserProfile.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';
import { exitUserProfileType, showEditProfileType, showUserProfileType } from '../../../state/actionTypes';
import EditProfile from './EditProfile/EditProfile';
import { bindAll } from 'lodash';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingPhoto: false,
      processing: false,
      data_uri: null,
      filename: null,
      filetype: null
    }

    bindAll(this, 'handleMessageClick', 'handleBookmarksClick', 'handleAddPhoto', 'handleFile', 'handleImageUpload');
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

  handleExit() {
    this.props.updateMain(exitUserProfileType);
    this.props.updateTargetUserId(null);
    this.props.updateUserProfile(null);
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

  handleBookmarksClick(userId) {
    this.props.setBookmarks({ userId });
  }

  handleEditClick() {
    this.props.updateMain(showEditProfileType);
  }

  handleBack() {
    this.props.updateMain(showUserProfileType);
  }

  handleSignOut() {
    this.props.userSignOut();
  }

  handleAddPhoto() {
    this.setState({ addingPhoto: true });
  }

  handleImageUpload(e) {
    e.preventDefault();

    const { data_uri, filename, filetype } = this.state;

    this.props.uploadImage({ data_uri, filename, filetype });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    console.log(file);

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      })
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="UserProfile-container">
        <div className={
          `UserProfile-nav ${this.props.showEditProfile ? 'edit' : ''}`
        }>
          {
            this.props.showEditProfile ?
              <FaArrow
                className="UserProfile-back-icon"
                onClick={this.handleBack.bind(this)}
              />
            : <FaClose
                className="UserProfile-close-icon"
                onClick={this.handleExit.bind(this)}
              />
          }
        </div>

        {
          this.props.showEditProfile ?
            <EditProfile
              firstName={this.props.userInfo.firstName}
              lastName={this.props.userInfo.lastName}
              username={this.props.userInfo.username}
              email={this.props.userInfo.email}
              editUserProfile={this.props.editUserProfile}
              userId={this.props.currentUserId}
              updateMain={this.props.updateMain}
            />
          : <div className="UserProfile-main-container">
              {
                this.props.targetUserProfile ?
                  <div className="UserProfile-main">
                    <div className="UserProfile-top">
                      <div className="UserProfile-image-container">
                        <div className="UserProfile-image">
                          <div
                            className={
                              this.state.addingPhoto ?
                                'UserProfile-add-prompt hide'
                                : 'UserProfile-add-prompt'
                            }
                            onClick={this.handleAddPhoto}>
                            <h3>Add photo</h3>
                          </div>
                          {
                            this.state.addingPhoto ?
                              <div>
                                <form onSubmit={this.handleImageUpload}>
                                  <input type="file" onChange={this.handleFile} />
                                  <input disabled={this.state.processing} className="UserProfile-image-submit" type="submit" value="Upload" />
                                </form>
                              </div>
                            : <FaUser className="UserProfile-user-icon" />
                          }
                        </div>
                      </div>

                      <div className="UserProfile-name">
                        <h3>
                          {this.props.targetUserProfile.firstName} {this.props.targetUserProfile.lastName}
                        </h3>
                        {
                          this.props.currentUserId === this.props.targetUserId ?
                            this.userIsOnline(this.props.targetUserId) ?
                              <div className="UserProfile-online"></div>
                            : <div className="UserProfile-not-online"></div>
                          : null
                        }
                      </div>

                      {
                        this.props.currentUserId === this.props.targetUserId ?
                          <div className="UserProfile-options">
                            <button
                              className="UserProfile-btn"
                              onClick={() => this.handleBookmarksClick(this.props.targetUserId)}
                            >
                              Bookmarks
                            </button>

                            <button
                              className="UserProfile-btn"
                              onClick={this.handleEditClick.bind(this)}
                            >
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

                            <button
                              className="UserProfile-btn"
                              onClick={() => this.handleBookmarksClick(this.props.targetUserId)}
                            >
                              Bookmarks
                            </button>
                          </div>
                      }
                    </div>

                    <div className="UserProfile-bottom">
                      <div className="UserProfile-info-container">
                        <div className="UserProfile-info">
                          <p className="UserProfile-title">Username</p>
                          <p className="UserProfile-data">
                            {this.props.targetUserProfile.username}
                          </p>
                        </div>

                        <div className="UserProfile-info">
                          <p className="UserProfile-title">Email</p>
                          <p className="UserProfile-data">
                            {this.props.targetUserProfile.email}
                          </p>
                        </div>
                      </div>

                      {
                        this.props.currentUserId === this.props.targetUserId ?
                        <div className="UserProfile-signout">
                          <p onClick={this.handleSignOut.bind(this)}>Sign Out</p>
                        </div>
                        : null
                      }
                    </div>
                  </div>

                : null
              }
            </div>
        }
      </div>
    )
  }
}

export default passPropsByUser(UserProfile);
