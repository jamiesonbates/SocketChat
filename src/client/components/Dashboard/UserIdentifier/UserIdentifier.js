import React from 'react';

import './UserIdentifier.scss';
import { showUserProfileType } from '../../../state/actionTypes';

class UserIdentifier extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickOnUser() {
    this.props.updateTargetUserId(this.props.userId);
    this.props.updateUserProfile(this.props.userId);
    this.props.updateMain(showUserProfileType);
  }

  render() {
    return (
      <p className="UserIdentifier" onClick={this.handleClickOnUser.bind(this)}>
        {this.props.firstName} {this.props.lastName}
      </p>
    )
  }
}

export default UserIdentifier;
