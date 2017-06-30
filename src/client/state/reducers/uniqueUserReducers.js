import {
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType,
  setTargetUserIdType,
  setTargetBookmarksIdType
} from '../actionTypes';

export default function reducer(state={
  userProfile: null,
  targetUserId: null,
  targetBookmarksId: null
}, action) {
  switch(action.type) {
    case setUserProfileType:
    case resetUserProfileType:
    case noUserProfileMatchType:
      return {
        ...state,
        userProfile: action.payload
      }

    case setTargetUserIdType:
      return {
        ...state,
        targetUserId: action.payload
      }

    case setTargetBookmarksIdType:
      return {
        ...state,
        targetBookmarksId: action.payload
      }
  }

  return state;
}
