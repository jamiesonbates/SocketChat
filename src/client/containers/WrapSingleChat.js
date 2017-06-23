import React from 'react';
import { connect } from 'react-redux';

import { startedTyping, stoppedTyping } from '../state/actions/socketActions';
import { sendMessage } from '../state/actions/chatActions';

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
      chatsWithTyping: state.chats.chatsWithTyping
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      sendMessage: (data) => { dispatch(sendMessage(data)) },
      startedTyping: (data) => { dispatch(startedTyping(data)) },
      stoppedTyping: (data) => { dispatch(stoppedTyping(data)) }
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapSingleChat);
}
