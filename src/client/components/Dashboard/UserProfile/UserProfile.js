import React from 'react';
import FaUser from 'react-icons/lib/fa/user';

import './UserProfile.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
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

  render() {
    return (
      <div className="UserProfile-container">
        {
          this.props.targetUserProfile ?
            <div className="UserProfile-main">
              <div className="UserProfile-top">
                <FaUser className="UserProfile-icon" />

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

                <div className="UserProfile-options">
                  <button className="UserProfile-message-btn">Message</button>
                </div>
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
