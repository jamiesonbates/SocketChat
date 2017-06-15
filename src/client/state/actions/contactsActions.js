import axios from 'axios';

export function getContacts() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/contacts/${userId}`)
      .then((res) => {
        console.log(res.data);
      })
  }
}
