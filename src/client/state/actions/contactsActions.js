import axios from 'axios';

import { updateContactsType, addNewGroupMemberType, setOtherContactsType, stopSearchForOtherUsersType } from '../actionTypes';

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

export function findContacts(searchTerm) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    if (!searchTerm) {
      return;
    }

    axios.get(`/api/contacts/find/${searchTerm}/${userId}`)
      .then((res) => {
        dispatch({ type: setOtherContactsType, payload: res.data });
      })
  }
}

export function createContact(userId1, userId2) {
  return function(dispatch, getState) {
    const state = getState();
    const usersContacts = state.contacts.usersContacts;

    for (const contact of usersContacts) {
      if (contact.id === userId2) {
        return;
      }
    }

    axios.post('/api/contacts/', { userId1, userId2 })
      .then((res) => {
        dispatch({ type: updateContactsType, payload: res.data });
      });
  }
}

export function addNewGroupMember(userId) {
  return function(dispatch, getState) {
    const state = getState();
    const newGroup = state.contacts.newGroup;
    const newGroupIds = [...newGroup].map(user => user.id);
    const usersContacts = state.contacts.usersContacts;
    const otherContacts = state.contacts.otherContacts;
    let user;

    if (newGroupIds.includes(userId)) {
      return;
    }

    for (const contact of usersContacts) {
      if (contact.id === userId) {
        user = contact;
      }
    }

    if (!user) {
      for (const contact of otherContacts) {
        if (contact.id === userId) {
          user = contact;
        }
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
