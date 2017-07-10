import {
  authSuccess,
  authFailure,
  loginSuccess,
  signupSuccess,
  setUsersCategoriesType
} from '../actionTypes';

export default function reducer(state={
  userAuth: false,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  categories: null
}, action) {
  switch (action.type) {
    case loginSuccess:
    case authSuccess:
    case signupSuccess:
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

    case authFailure:
      return {
        ...state,
        userAuth: false,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null
      }

    case setUsersCategoriesType:
      return {
        ...state,
        categories: action.payload
      }
  }

  return state;
}
