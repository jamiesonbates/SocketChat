import {
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType
} from '../actionTypes';

export default function reducer(state={
  userProfile: null
}, action) {
  switch(action.type) {
    case setUserProfileType:
    case resetUserProfileType:
    case noUserProfileMatchType:
      return {
        ...state,
        userProfile: action.payload
      }
  }

  return state;
}
