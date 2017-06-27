import React from 'react';
import { connect } from 'react-redux';

import { updateUserProfile } from '../state/actions/uniqueUserActions';
import { setChat, createChat } from '../state/actions/chatActions';

export default function(ComposedClass) {
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
      targetUserId: state.uniqueUserInfo.targetUserId,
      targetUserProfile: state.uniqueUserInfo.userProfile,
      usersOnline: state.chats.usersOnline,
      currentUserId: state.userInfo.id,
      allChats: state.chats.allChats
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      updateUserProfile: (data) => dispatch(updateUserProfile(data)),
      setChat: (data) => dispatch(setChat(data)),
      createChat: (data) => dispatch(createChat(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(PassPropsByUser);
}
