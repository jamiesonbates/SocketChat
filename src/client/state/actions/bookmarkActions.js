import axios from 'axios';

import {
  showBookmarksType,
  setBookmarksType,
  updateBookmarksInChatType,
  resetBookmarksType,
  setUsersCategoriesType,
  setRecentBookmarksType,
  updateCategoryPrivacyType
} from '../actionTypes';
import { updateMain } from './dashControlActions';
import { updateTargetBookmarksId } from './uniqueUserActions';

export function setBookmarks({ userId, forRecent=false }) {
  return function(dispatch, getState) {
    const state = getState();
    const curUserId = state.userInfo.id;

    axios.get(`/api/bookmarks/${userId}/${curUserId}`)
      .then((res) => {
        dispatch({ type: setBookmarksType, payload: res.data });

        if (!forRecent) {
          dispatch(updateMain(showBookmarksType));
          dispatch(updateTargetBookmarksId(userId));
        }
      })
  }
}

export function updateCategoryPrivacy({ catId, privacy }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const bookmarks = state.bookmarks.bookmarks;

    axios.put(`/api/categories`, { userId, catId, privacy })
      .then((res) => {
        if (typeof res.data === 'string') {
          return;
        }

        const nextBookmarks = bookmarks.map(bookmark => {
          if (bookmark.catId === catId) {
            bookmark.privacy = res.data.privacy;
          }

          return bookmark;
        });

        dispatch({ type: updateCategoryPrivacyType, payload: nextBookmarks });
      });
  }
}

export function getRecentBookmarks() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/categories/recent/${userId}`)
      .then(({ data }) => {
        if (!data.length) {
          return;
        }
        
        dispatch({ type: setRecentBookmarksType, payload: data });
      })
  }
}

export function resetBookmarks() {
  return {
    type: resetBookmarksType
  }
}

export function getCategories() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/categories/${userId}`)
      .then(({ data }) => {
        dispatch({ type: setUsersCategoriesType, payload: data });
      });
  }
}

export function addCategory(name) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.post('/api/categories', { userId, name })
      .then((res) => {
        dispatch(setBookmarks({ userId, forRecent: true }));
      })
  }
}

export function deleteCategory(catId) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.delete(`/api/categories/${catId}`)
      .then((res) => {
        dispatch(setBookmarks({ userId, forRecent: true }));
      })
  }
}

export function bookmarkMsg({ msgId, catId }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.post('/api/bookmarks', { msgId, catId, userId })
      .then(({ data }) => {
        let newRecord = data;

        const nextAllChats = state.chats.allChats.map(chat => {
          if (chat.id === newRecord.chat_id) {
            chat.messages = chat.messages.map(message => {
              if (message.id === newRecord.message_id) {
                message.starred = true;
              }

              return message;
            })
          }

          return chat;
        });

        return dispatch({
          type: updateBookmarksInChatType,
          payload: nextAllChats
        })
      });
  }
}

export function unBookmarkMsg(starredMessagesId) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.uniqueUserInfo.targetBookmarksId;

    axios.delete(`/api/bookmarks/${starredMessagesId}`)
      .then((data) => {
        dispatch(setBookmarks({ userId }));
      })
  }
}

export function recategorizeBookmark(msgId, catId) {

}
