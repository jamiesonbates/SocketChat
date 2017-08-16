import React from 'react';
import FaUser from 'react-icons/lib/fa/user';
import FaClose from 'react-icons/lib/md/close';
import FaArrow from 'react-icons/lib/md/arrow-back';
import FaUpload from 'react-icons/lib/ti/upload';

import './UserProfile.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';
import { exitUserProfileType, showEditProfileType, showUserProfileType, startProcessingImageType } from '../../../state/actionTypes';
import EditProfile from './EditProfile/EditProfile';
import { bindAll } from 'lodash';
import Utilities from '../../../utilities/Utilities';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingPhoto: false,
      data_uri: null,
      filename: null,
      filetype: null,
      photoChosen: false
    }

    bindAll(this, 'handleMessageClick', 'handleBookmarksClick', 'handleAddPhoto', 'handleFile', 'handleImageUpload', 'handleExitAddPhoto');
  }

  componentWillMount() {
    if (!this.props.userProfile) {
      this.props.updateUserProfile(this.props.targetUserId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.targetUserId !== this.props.targetUserId) {
      this.setState({
        addingPhoto: false,
        data_uri: null,
        filename: null,
        filetype: null,
        photoChosen: false
      });
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

    this.props.updateMain(startProcessingImageType);
    this.props.uploadImage({ data_uri, filename, filetype });
    this.setState({
      addingPhoto: false,
      filename: null,
      filetype: null,
      data_uri: null,
      photoChosen: false
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        photoChosen: true
      })
    };

    reader.readAsDataURL(file);
  }

  handleExitAddPhoto() {
    this.setState({
      addingPhoto: false,
      data_uri: null,
      filename: null,
      filetype: null,
      photoChose: false
    });
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
                this.props.userProfile ?
                  <div className="UserProfile-main">
                    <div className="UserProfile-top">
                      <div className="UserProfile-image-container">
                        <div className={ this.state.addingPhoto || this.props.processingImage ? 'UserProfile-image square': 'UserProfile-image' }>
                          {
                            this.state.addingPhoto ?
                              <FaClose
                                className="UserProfile-exit-add-photo"
                                onClick={this.handleExitAddPhoto} />
                            : null
                          }

                          {
                            this.props.currentUserId === this.props.targetUserId ?
                              <div
                                className={
                                  this.state.addingPhoto || this.props.processingImage ?
                                  'UserProfile-add-prompt hide'
                                  : 'UserProfile-add-prompt'
                                }
                                onClick={this.handleAddPhoto}>
                                {
                                  this.props.userProfile.cloudinaryUrl ?
                                    <h3>Change photo</h3>
                                  : <h3>Add photo</h3>
                                }
                              </div>
                            : null
                          }

                          {
                            (this.state.addingPhoto || this.props.processingImage) && this.props.currentUserId === this.props.targetUserId ?
                              this.props.processingImage ?
                                <div className="UserProfile-image-processing">
                                  <h3>Processing...</h3>
                                </div>
                              : <div>
                                  <form onSubmit={this.handleImageUpload}>
                                    <label
                                      htmlFor="file"
                                      className="UserProfile-file-label">
                                      <FaUpload className="UserProfile-file-label-icon"/>
                                      <h3>{this.state.photoChosen ? this.state.filename : 'Choose a photo'}</h3>
                                    </label>
                                    <input
                                      className="UserProfile-file-input"
                                      id="file"
                                      name="file"
                                      type="file"
                                      onChange={this.handleFile}
                                    />
                                    <input
                                      disabled={!this.state.photoChosen}
                                      className="UserProfile-image-submit"
                                      type="submit"
                                      value="Upload"
                                    />
                                  </form>
                                </div>
                            : this.props.userProfile.cloudinaryUrl ?
                              Utilities.userIconMaker([this.props.userProfile], 'FOR_PROFILE')
                              : <FaUser className="UserProfile-user-icon" />
                          }
                        </div>
                      </div>

                      <div className="UserProfile-name">
                        <h3>
                          {this.props.userProfile.firstName} {this.props.userProfile.lastName}
                        </h3>
                        {
                          this.props.currentUserId !== this.props.targetUserId ?
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
                            {this.props.userProfile.username}
                          </p>
                        </div>

                        <div className="UserProfile-info">
                          <p className="UserProfile-title">Email</p>
                          <p className="UserProfile-data">
                            {this.props.userProfile.email}
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
