import axios from 'axios';

import { setChatViewHistoryType } from '../../actionTypes';

export function getChatViews() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const allChats = state.chats.allChats;

    axios.get(`/api/chats/view_history/${userId}`)
      .then(({ data }) => {
        const nextChatLastSeen = data.map((history) => {
          history = {
            chatId: history.chatId,
            lastSeen: history.lastSeen
          }

          return history;
        })

        const nextChatNewMessages = data.map((history) => {
          const wholeChat = findChat(allChats, history.chatId);
          history = {
            chatId: history.chatId,
            count: wholeChat.originalCount
          }

          return history;
        });

        const payload = {
          nextChatLastSeen,
          nextChatNewMessages
        }

        dispatch({ type: setChatViewHistoryType, payload });
      })
  }
}

function findChat(chats, id) {
  for (const chat of chats) {
    if (chat.id === id) {
      return chat;
    }
  }

  return null;
}
