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
  resetSingleChatType,
  updateChatViewHistoryType,
  updateNewMessageCountType,
  setChatViewHistoryType,
  updateChatLastSeenType
} from '../actionTypes';

export default function reducer(state={
  allChats: null,
  singleChat: null,
  usersOnline: [],
  chatsWithTyping: [],
  chatLastSeen: [],
  chatNewMessages: [],
  currentChat: null,
  currentChatMessages: [],
  currentChatUsers: []
}, action) {
  switch(action.type) {
    case chatsSuccess:
      return {
        ...state,
        allChats: action.payload
      }

    case resetSingleChatType:
    case newSingleChat:
      return {
        ...state,
        singleChat: action.payload.id,
        currentChat: action.payload.nextCurrentChat,
        currentChatMessages: action.payload.nextCurrentChatMessages,
        currentChatUsers: action.payload.nextCurrentChatUsers
      }

    case addNewMessage:
      return {
        ...state,
        allChats: action.payload.nextChats,
        currentChat: action.payload.nextCurrentChat,
        currentChatMessages: action.payload.nextCurrentChatMessages,
        currentChatUsers: action.payload.nextCurrentChatUsers
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

    case setChatViewHistoryType:
      return {
        ...state,
        chatLastSeen: action.payload.nextChatLastSeen,
        chatNewMessages: action.payload.nextChatNewMessages
      }

    case updateChatLastSeenType:
      return {
        ...state,
        chatLastSeen: action.payload
      }

    case updateNewMessageCountType:
      return {
        ...state,
        chatNewMessages: action.payload
      }
  }

  return state;
}
