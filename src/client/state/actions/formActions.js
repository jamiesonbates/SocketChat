import { updateGroupNameType } from '../actionTypes';

export function updateGroupName(name) {
  return {
    type: updateGroupNameType,
    payload: name
  }
}
