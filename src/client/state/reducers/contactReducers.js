import {
  updateContactsType
} from '../actionTypes';

export default function reducer(state={
  usersContacts: []
}, action) {
  switch(action.type) {
    case updateContactsType:
      return {
        ...state,
        usersContacts: action.payload
      }
  }

  return state;
}
