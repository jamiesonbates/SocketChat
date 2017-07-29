import axios from 'axios';

import {
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType,
  setTargetUserIdType,
  setTargetBookmarksIdType,
  resetTargetBookmarksIdType,
  updateUserProfileType
} from '../actionTypes';

export function updateUserProfile(targetUserId) {
  return function(dispatch, getState) {
    if (!targetUserId) {
      return dispatch({ type: resetUserProfileType, payload: null });
    }

    const state = getState();
    const currentUserId = state.userInfo.id;
    let userProfile;

    if (targetUserId === currentUserId) {
      userProfile = state.userInfo;

      return dispatch({ type: setUserProfileType, payload: userProfile });
    }
    else {
      const contacts = state.contacts.usersContacts;

      for (const contact of contacts) {
        if (contact.id === targetUserId) {
          return dispatch({ type: setUserProfileType, payload: contact });
        }
      }
    }

    return dispatch({ type: noUserProfileMatchType, payload: null });
  }
}

export function updateTargetUserId(userId) {
  return {
    type: setTargetUserIdType,
    payload: userId
  }
}

export function updateTargetBookmarksId(userId) {
  return {
    type: setTargetBookmarksIdType,
    payload: userId
  }
}

export function resetTargetBookmarksId() {
  return {
    type: resetTargetBookmarksIdType
  }
}

export function editUserProfile({ firstName, lastName, username, email, userId }) {
  return function(dispatch, getState) {
    const state = getState();
    const curUserId = state.userInfo.id;
    let nextUserProfile = { ...state.userInfo };
    console.log(nextUserProfile);

    console.log(userId, curUserId);

    if (userId !== curUserId) {
      return;
    }

    axios.put('/api/users', { firstName, lastName, username, email, userId })
      .then((res) => {
        nextUserProfile = {
          ...nextUserProfile,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          username: res.data.username,
          email: res.data.email
        }

        dispatch({ type: updateUserProfileType, payload: nextUserProfile });
      });
  }
}
