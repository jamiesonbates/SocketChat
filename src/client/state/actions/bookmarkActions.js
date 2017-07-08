import axios from 'axios';

import { showBookmarksType, setBookmarksType, updateBookmarksInChatType } from '../actionTypes';
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

export function bookmarkMsg({ msgId, catId }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.post('/api/bookmarks', { msgId, catId, userId })
      .then(({ data }) => {
        let newRecord = data;
        
        const nextAllChats = state.chats.allChats.map(chat => {
          console.log(chat.id, newRecord.chat_id);
          if (chat.id === newRecord.chat_id) {
            console.log('here 1');
            chat.messages = chat.messages.map(message => {
              console.log(message.id, newRecord.message_id);
              if (message.id === newRecord.message_id) {
                console.log('here 2');
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
        });
      })
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
