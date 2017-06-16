import { updateGroupNameType, updateSearchTermType } from '../actionTypes';

export default function reducer(state={
  groupName: '',
  searchTerm: ''
}, action) {
  switch(action.type) {
    case updateGroupNameType:
      return {
        ...state,
        groupName: action.payload
      }

    case updateSearchTermType:
      return {
        ...state,
        searchTerm: action.payload
      }
  }

  return state;
}
