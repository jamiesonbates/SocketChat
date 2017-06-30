import { setBookmarksType } from '../actionTypes';

export default function reducer(state={
  bookmarks: null
}, action) {
  switch(action.type) {
    case setBookmarksType:
      return {
        ...state,
        bookmarks: action.payload
      }
  }

  return state;
}
