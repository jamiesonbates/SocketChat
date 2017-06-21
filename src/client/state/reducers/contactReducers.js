import {
  updateContactsType,
  addNewGroupMemberType
} from '../actionTypes';

export default function reducer(state={
  usersContacts: [],
  newGroup: []
}, action) {
  switch(action.type) {
    case updateContactsType:
      return {
        ...state,
        usersContacts: action.payload
      }

    case addNewGroupMemberType:
      return {
        ...state,
        newGroup: action.payload
      }
  }

  return state;
}
