import axios from 'axios';

export function getBookmarks(userId) {
  return function(dispatch, getState) {
    axios.get(`/bookmarks/${userId}`)
      .then((res) => {
        console.log(res.data);
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
