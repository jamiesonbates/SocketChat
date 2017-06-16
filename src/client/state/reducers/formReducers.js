import { updateGroupNameType } from '../actionTypes';

export default function reducer(state={
  groupName: ''
}, action) {
  switch(action.type) {
    case updateGroupNameType:
      return {
        ...state,
        groupName: action.payload
      }
  }

  return state;
}
