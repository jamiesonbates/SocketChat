import React from 'react';
import { connect } from 'react-redux';

import {
  connectSocket,
  disconnectSocket,
  notifyCommonUsers,
  manageRoom
} from '../state/actions/socketActions';
import { fetchChats } from '../state/actions/chatActions';
import { getContacts } from '../state/actions/contactsActions';
import { getCommonUsers } from '../state/actions/onlineActions';
import { getCategories } from '../state/actions/bookmarkActions';

export default function(ComposedClass) {
  class WrapDashboard extends React.Component {
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
      allChats: state.chats.allChats,
      showDefaultMain: state.dashControls.showDefaultMain,
      showUserProfile: state.dashControls.showUserProfile,
      showChat: state.dashControls.showChat,
      userId: state.userInfo.id
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      connectSocket: () => dispatch(connectSocket()),
      disconnectSocket: () => dispatch(disconnectSocket()),
      notifyCommonUsers: () => dispatch(notifyCommonUsers()),
      manageRoom: (data) => dispatch(manageRoom(data)),
      fetchChats: (data) => dispatch(fetchChats(data)),
      getCommonUsers: () => dispatch(getCommonUsers()),
      getContacts: () => dispatch(getContacts()),
      getCategories: () => dispatch(getCategories())
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapDashboard);
}
