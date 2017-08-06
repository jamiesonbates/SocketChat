import React from 'react';
import { connect } from 'react-redux';

import { updateUserProfile, updateTargetUserId, editUserProfile } from '../state/actions/uniqueUserActions';
import { setChat, createChat } from '../state/actions/chatActions';
import { updateMain } from '../state/actions/dashControlActions';
import { setBookmarks, unBookmarkMsg, resetBookmarks, updateCategoryPrivacy, addCategory, deleteCategory } from '../state/actions/bookmarkActions';
import { resetTargetBookmarksId } from '../state/actions/uniqueUserActions';
import { userSignOut } from '../state/actions/userActions';
import { uploadImage } from '../state/actions/imageActions';

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
      targetBookmarksId: state.uniqueUserInfo.targetBookmarksId,
      bookmarks: state.bookmarks.bookmarks,
      usersOnline: state.chats.usersOnline,
      currentUserId: state.userInfo.id,
      allChats: state.chats.allChats,
      showEditProfile: state.dashControls.showEditProfile,
      userInfo: state.userInfo,
      processingImage: state.dashControls.processingImage
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      updateTargetUserId: (data) => dispatch(updateTargetUserId(data)),
      updateUserProfile: (data) => dispatch(updateUserProfile(data)),
      setChat: (data) => dispatch(setChat(data)),
      createChat: (data) => dispatch(createChat(data)),
      updateMain: (data) => dispatch(updateMain(data)),
      setBookmarks: (data) => dispatch(setBookmarks(data)),
      unBookmarkMsg: (data) => dispatch(unBookmarkMsg(data)),
      resetBookmarks: () => dispatch(resetBookmarks()),
      resetTargetBookmarksId: () => dispatch(resetTargetBookmarksId()),
      updateCategoryPrivacy: (data) => dispatch(updateCategoryPrivacy(data)),
      addCategory: (data) => dispatch(addCategory(data)),
      deleteCategory: (data) => dispatch(deleteCategory(data)),
      editUserProfile: (data) => dispatch(editUserProfile(data)),
      userSignOut: () => dispatch(userSignOut()),
      uploadImage: (data) => dispatch(uploadImage(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(PassPropsByUser);
}
