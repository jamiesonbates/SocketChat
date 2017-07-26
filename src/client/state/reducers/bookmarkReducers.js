import { setBookmarksType, resetBookmarksType, updateCategoryPrivacyType } from '../actionTypes';

export default function reducer(state={
  bookmarks: null
}, action) {
  switch(action.type) {
    case setBookmarksType:
    case updateCategoryPrivacyType:
      return {
        ...state,
        bookmarks: action.payload
      }
    case resetBookmarksType:
      return {
        ...state,
        bookmarks: null
      }
  }

  return state;
}
