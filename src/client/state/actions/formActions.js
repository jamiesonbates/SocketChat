import { updateGroupNameType, updateSearchTermType } from '../actionTypes';

export function updateGroupName(name) {
  return {
    type: updateGroupNameType,
    payload: name
  }
}

export function updateSearchTerm(term) {
  return {
    type: updateSearchTermType,
    payload: term
  }
}
