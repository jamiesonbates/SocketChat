import React from 'react';

import './UserProfile.scss';
import passPropsByUser from '../../../containers/PassPropsByUser';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <div className="UserProfile-container">
        Hello World!
      </div>
    )
  }
}

export default passPropsByUser(UserProfile);
