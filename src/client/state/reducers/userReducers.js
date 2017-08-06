import {
  authSuccess,
  authFailure,
  loginSuccess,
  signupSuccess,
  setUsersCategoriesType,
  setRecentBookmarksType,
  updateProfilePicType
} from '../actionTypes';

export default function reducer(state={
  userAuth: false,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  categories: null,
  recentBookmarks: null,
  cloudinary_url: null
}, action) {
  switch (action.type) {
    case loginSuccess:
    case authSuccess:
    case signupSuccess:
      const { id, firstName, lastName, email, username, cloudinaryUrl } = action.payload;

      return {
        ...state,
        userAuth: true,
        id,
        firstName,
        lastName,
        email,
        username,
        cloudinaryUrl
     }

    case authFailure:
      return {
        ...state,
        userAuth: false,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        cloudinaryUrl: null
      }

    case setUsersCategoriesType:
      return {
        ...state,
        categories: action.payload
      }

    case setRecentBookmarksType:
      return {
        ...state,
        recentBookmarks: action.payload
      }

    case updateProfilePicType:
      return {
        ...state,
        cloudinaryUrl: action.payload
      }
  }

  return state;
}
