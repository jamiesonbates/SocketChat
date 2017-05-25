import { loginFailure, signupFailure } from '../actionTypes';

export default function reducer(state={
  login: null,
  signup: null
}, action) {
  switch (action.type) {
    case loginFailure:
      return {
        ...state,
        login: action.payload
      }

    case signupFailure:
      return {
        ...state,
        signup: action.payload
      }
  }

  return state;
}
