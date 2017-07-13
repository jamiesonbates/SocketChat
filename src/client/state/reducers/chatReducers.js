import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  userNowOnline,
  userNowOffline,
  someoneStartedTypingType,
  someoneStoppedTypingType,
  setUsersOnlineType,
  updateBookmarksInChatType,
  updateChatSeenType,
  resetSingleChatType
} from '../actionTypes';

export default function reducer(state={
  allChats: null,
  singleChat: null,
  usersOnline: [],
  chatsWithTyping: []
}, action) {
  switch(action.type) {
    case updateChatSeenType:
    case chatsSuccess:
      return {
        ...state,
        allChats: action.payload
      }

    case resetSingleChatType:
    case newSingleChat:
      return {
        ...state,
        singleChat: action.payload
      }

    case addNewMessage:
      return {
        ...state,
        allChats: action.payload
      }

    case userNowOnline:
    case setUsersOnlineType:
      return {
        ...state,
        usersOnline: action.payload
      }

    case userNowOffline:
      return {
        ...state,
        usersOnline: action.payload
      }

    case someoneStartedTypingType:
      return {
        ...state,
        chatsWithTyping: action.payload
      }

    case someoneStoppedTypingType:
      return {
        ...state,
        chatsWithTyping: action.payload
      }
    case updateBookmarksInChatType:
      return {
        ...state,
        allChats: action.payload
      }
  }

  return state;
}
