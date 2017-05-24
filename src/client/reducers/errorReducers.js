import { userLoginFailure } from '../../shared/actionTypes';

export default function reducer(state={
  login: null
}, action) {
  switch (action.type) {
    case userLoginFailure:
      return {
        ...state,
        login: action.payload
      }
  }

  return state;
}
