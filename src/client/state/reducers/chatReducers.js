import { chatsSuccess } from '../actionTypes';

export default function reducer(state={
  chats: null
}, action) {
  switch(action.type) {
    case chatsSuccess:
      return {
        ...state,
        chats: action.payload
      }
  }

  return state;
}
