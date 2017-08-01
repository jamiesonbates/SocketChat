import {
  updateContactsType,
  addNewGroupMemberType,
  setOtherContactsType
} from '../actionTypes';

export default function reducer(state={
  usersContacts: [],
  otherContacts: [],
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
    case setOtherContactsType:
      return {
        ...state,
        otherContacts: action.payload
      }
  }

  return state;
}
