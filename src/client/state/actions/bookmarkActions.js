import axios from 'axios';

import {
  showBookmarksType,
  setBookmarksType,
  updateBookmarksInChatType,
  resetBookmarksType
} from '../actionTypes';
import { updateMain } from './dashControlActions';
import { updateTargetBookmarksId } from './uniqueUserActions';

export function setBookmarks(userId) {
  return function(dispatch, getState) {
    axios.get(`/api/bookmarks/${userId}`)
      .then((res) => {
        dispatch({ type: setBookmarksType, payload: res.data });
        dispatch(updateMain(showBookmarksType));
        dispatch(updateTargetBookmarksId(userId));
      })
  }
}

export function resetBookmarks() {
  return {
    type: resetBookmarksType
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
        dispatch(setBookmarks(userId));
      })
  }
}

export function recategorizeBookmark(msgId, catId) {

}
