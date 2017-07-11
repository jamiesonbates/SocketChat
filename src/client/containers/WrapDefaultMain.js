import React from 'react';
import { connect } from 'react-redux';

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
      bookmarks: state.bookmarks.bookmarks
    }
  }

  const mapDispatchToProps = dispatch => (
    {

    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapDefaultMain);
}
