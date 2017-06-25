import {
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType
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
