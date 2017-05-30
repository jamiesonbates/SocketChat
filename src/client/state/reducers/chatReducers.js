import { chatsSuccess, newSingleChat } from '../actionTypes';

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
  }

  return state;
}
