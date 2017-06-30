import axios from 'axios';

import { showBookmarksType, setBookmarksType } from '../actionTypes';
import { updateMain } from './dashControlActions';

export function setBookmarks(userId) {
  return function(dispatch, getState) {
    axios.get(`/api/bookmarks/${userId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: setBookmarksType,
          payload: res.data
        })
        dispatch(updateMain(showBookmarksType));
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

  }
}

export function unBookmarkMsg(msgId) {
  return function(dispatch, getState) {

  }
}

export function recategorizeBookmark(msgId, catId) {

}
