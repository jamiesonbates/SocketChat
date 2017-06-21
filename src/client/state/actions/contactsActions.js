import axios from 'axios';

import { updateContactsType, addNewGroupMemberType } from '../actionTypes';

export function getContacts() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/contacts/${userId}`)
      .then((res) => {
        dispatch({
          type: updateContactsType,
          payload: res.data
        })
      })
  }
}

export function addNewGroupMember(userId) {
  return function(dispatch, getState) {
    const state = getState();
    const newGroup = state.contacts.newGroup;
    const usersContacts = state.contacts.usersContacts;
    let user;

    for (const contact of usersContacts) {
      if (contact.id === userId) {
        user = contact;
      }
    }

    const nextNewGroup = [
      ...newGroup,
      user
    ];

    dispatch({
      type: addNewGroupMemberType,
      payload: nextNewGroup
    });
  }
}
