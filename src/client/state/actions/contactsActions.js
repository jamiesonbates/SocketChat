import axios from 'axios';

import { updateContactsType, addNewGroupMemberType, setOtherContactsType } from '../actionTypes';

export function getContacts() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/contacts/known/${userId}`)
      .then((res) => {
        dispatch({
          type: updateContactsType,
          payload: res.data
        })
      })
  }
}

export function findContacts() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    let searchTerm = state.forms.searchTerm;

    if (!searchTerm) {
      searchTerm = null;
    }

    axios.get(`/api/contacts/find/${searchTerm}/${userId}`)
      .then((res) => {
        dispatch({ type: setOtherContactsType, payload: res.data });
      })
  }
}

export function addNewGroupMember(userId) {
  return function(dispatch, getState) {
    const state = getState();
    const newGroup = state.contacts.newGroup;
    const newGroupIds = [...newGroup].map(user => user.id);
    const usersContacts = state.contacts.usersContacts;
    let user;

    if (newGroupIds.includes(userId)) {
      return;
    }

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
