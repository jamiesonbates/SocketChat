import { userLoginSuccess } from '../../shared/actionTypes';

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
  }

  return state;
}
