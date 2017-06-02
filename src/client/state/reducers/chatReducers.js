import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  userNowOnline,
  userNowOffline
} from '../actionTypes';

export default function reducer(state={
  allChats: null,
  singleChat: null,
  usersOnline: []
}, action) {
  switch(action.type) {
    case chatsSuccess:
      return {
        ...state,
        allChats: action.payload
      }

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
      return {
        ...state,
        usersOnline: action.payload
      }

    case userNowOffline:
      return {
        ...state,
        usersOnline: action.payload
      }
  }

  return state;
}
