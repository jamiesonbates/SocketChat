import axios from 'axios';

import { showBookmarksType, setBookmarksType } from '../actionTypes';
import { updateMain } from './dashControlActions';
import { updateTargetBookmarksId } from './uniqueUserActions';

export function setBookmarks(userId) {
  return function(dispatch, getState) {
    axios.get(`/api/bookmarks/${userId}`)
      .then((res) => {
        dispatch({
          type: setBookmarksType,
          payload: res.data
        })
        dispatch(updateMain(showBookmarksType));
        dispatch(updateTargetBookmarksId(userId));
      })
  }
}

export function addCategory(name) {
  return function(dispatch, getState) {
    const state = getState();
  }
}

export function deleteCategory(catId) {
  return function(dispatch, getState) {

  }
}

export function bookmarkMsg(msgId, catId) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
  }
}

export function unBookmarkMsg(starredMessagesId) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.uniqueUserInfo.targetBookmarksId;

    axios.delete(`/api/bookmarks/${starredMessagesId}`)
      .then((data) => {
        console.log(data);
        dispatch(setBookmarks(userId));
      })
  }
}

export function recategorizeBookmark(msgId, catId) {

}
