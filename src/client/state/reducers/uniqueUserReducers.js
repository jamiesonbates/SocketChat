import {
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType,
  setTargetUserIdType
} from '../actionTypes';

export default function reducer(state={
  userProfile: null,
  targetUserId: null
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
  }

  return state;
}
