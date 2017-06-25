import React from 'react';
import { connect } from 'react-redux';

import { updateUserProfile } from '../state/actions/uniqueUserActions';

export default function(ComposedClass, userId) {
  class PassPropsByUser extends React.Component {
    constructor() {
      super();
    }
    render() {
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  const mapStateToProps = state => {
    return {
      targetUserId: state.uniqueUser.targetUserId
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      updateUserProfile: (data) => dispatch(updateUserProfile(data))
    }
  )

  return connect(mapStateToProps)(PassPropsByUser);
}
