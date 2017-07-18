import React from 'react';
import { connect } from 'react-redux';

import { resetBookmarks, getRecentBookmarks, setBookmarks } from '../state/actions/bookmarkActions';
import { updateMain, updateSide } from '../state/actions/dashControlActions';
import { setChat, updateChatSeen } from '../state/actions/chatActions';

export default function(ComposedClass) {
  class WrapDefaultMain extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <ComposedClass {...this.props}/>
      )
    }
  }

  const mapStateToProps = function(state) {
    return {
      allChats: state.chats.allChats,
      recentBookmarks: state.userInfo.recentBookmarks,
      userId: state.userInfo.id,
      userInfo: state.userInfo,
      newMessages: state.chats.chatNewMessages
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      resetBookmarks: () => dispatch(resetBookmarks()),
      getRecentBookmarks: () => dispatch(getRecentBookmarks()),
      updateMain: (data) => dispatch(updateMain(data)),
      updateSide: (data) => dispatch(updateSide(data)),
      setChat: (data) => dispatch(setChat(data)),
      setBookmarks: (data) => dispatch(setBookmarks(data)),
      updateChatSeen: (data) => dispatch(updateChatSeen(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapDefaultMain);
}
