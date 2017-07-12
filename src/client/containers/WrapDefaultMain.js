import React from 'react';
import { connect } from 'react-redux';

import { resetBookmarks, getRecentBookmarks } from '../state/actions/bookmarkActions';
import { updateMain, updateSide } from '../state/actions/dashControlActions';
import { setChat } from '../state/actions/chatActions';

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
      userId: state.userInfo.id
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      resetBookmarks: () => dispatch(resetBookmarks()),
      getRecentBookmarks: () => dispatch(getRecentBookmarks()),
      updateMain: (data) => dispatch(updateMain(data)),
      updateSide: (data) => dispatch(updateSide(data)),
      setChat: (data) => dispatch(setChat(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapDefaultMain);
}
