import { chatsSuccess, newSingleChat } from '../actionTypes';

export default function reducer(state={
  chats: null,
  singleChat: null
}, action) {
  switch(action.type) {
    case chatsSuccess:
      return {
        ...state,
        chats: action.payload
      }

    case newSingleChat:
      return {
        ...state,
        singleChat: action.payload
      }
  }

  return state;
}
