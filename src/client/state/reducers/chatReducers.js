import {
  chatsSuccess,
  newSingleChat,
  addNewMessage
} from '../actionTypes';

export default function reducer(state={
  allChats: null,
  singleChat: null
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
  }

  return state;
}
