import React from 'react';
import { connect } from 'react-redux';

import { startedTyping, stoppedTyping } from '../state/actions/socketActions';
import { sendMessage } from '../state/actions/chatActions';
import { updateMain } from '../state/actions/dashControlActions';
import { updateUserProfile, updateTargetUserId } from '../state/actions/uniqueUserActions';
import { bookmarkMsg } from '../state/actions/bookmarkActions';

export default function(ComposedClass) {
  class WrapSingleChat extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  const mapStateToProps = function(state) {
    return {
      usersOnline: state.chats.usersOnline,
      chatId: state.chats.singleChat.id,
      singleChat: state.chats.singleChat,
      users: state.chats.singleChat.users,
      userId: state.userInfo.id,
      messages: state.chats.singleChat.messages,
      chatsWithTyping: state.chats.chatsWithTyping,
      categories: state.userInfo.categories
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      sendMessage: (data) => dispatch(sendMessage(data)),
      startedTyping: (data) => dispatch(startedTyping(data)),
      stoppedTyping: (data) => dispatch(stoppedTyping(data)),
      updateMain: (data) => dispatch(updateMain(data)),
      updateTargetUserId: (data) => dispatch(updateTargetUserId(data)),
      bookmarkMsg: (data) => dispatch(bookmarkMsg(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapSingleChat);
}
