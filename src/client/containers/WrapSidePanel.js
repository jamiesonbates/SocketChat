import React from 'react';
import { connect } from 'react-redux';

import { updateSide, updateMain } from '../state/actions/dashControlActions';
import { fetchChats, setChat, createChat } from '../state/actions/chatActions';
import { updateGroupName, updateSearchTerm } from '../state/actions/formActions';
import { addNewGroupMember } from '../state/actions/contactsActions';
import { updateTargetUserId } from '../state/actions/uniqueUserActions';
import { setBookmarks } from '../state/actions/bookmarkActions';

export default function(ComposedClass) {
  class WrapSidePanel extends React.Component {
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
      showAddChat: state.dashControls.showAddChat,
      showGroupForm: state.dashControls.showGroupForm,
      showChatsList: state.dashControls.showChatsList,
      allChats: state.chats.allChats,
      userId: state.userInfo.id,
      newGroup: state.contacts.newGroup,
      usersContacts: state.contacts.usersContacts,
      groupName: state.forms.groupName,
      searchTerm: state.forms.searchTerm,
      userInfo: state.userInfo
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      updateSide: (data) => dispatch(updateSide(data)),
      updateMain: (data) => dispatch(updateMain(data)),
      fetchChats: (data) => dispatch(fetchChats(data)),
      setChat: (data) => dispatch(setChat(data)),
      createChat: (data) => dispatch(createChat(data)),
      updateGroupName: (data) => dispatch(updateGroupName(data)),
      updateSearchTerm: (data) => dispatch(updateSearchTerm(data)),
      addNewGroupMember: (data) => dispatch(addNewGroupMember(data)),
      updateTargetUserId: (data) => dispatch(updateTargetUserId(data)),
      setBookmarks: (data) => dispatch(setBookmarks(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapSidePanel);
}
