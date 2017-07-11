import React from 'react';
import { connect } from 'react-redux';

import { setBookmarks, resetBookmarks, getRecentBookmarks } from '../state/actions/bookmarkActions';

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
      setBookmarks: (data) => dispatch(setBookmarks(data)),
      resetBookmarks: () => dispatch(resetBookmarks()),
      getRecentBookmarks: () => dispatch(getRecentBookmarks())
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapDefaultMain);
}
