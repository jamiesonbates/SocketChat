import {
  userAuthSuccess,
  userLoginSuccess,
  userAuthFailure,
} from '../../../shared/actionTypes';

export default function reducer(state={
  userAuth: false,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null
}, action) {
  switch (action.type) {
    case userLoginSuccess:
    case userAuthSuccess:
      const { id, firstName, lastName, email, username } = action.payload;

      return {
        ...state,
        userAuth: true,
        id,
        firstName,
        lastName,
        email,
        username
     }

    case userAuthFailure:
      return {
        ...state,
        userAuth: false,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null
      }
  }

  return state;
}
