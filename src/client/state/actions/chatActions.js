import axios from 'axios';

export function fetchChats() {
  return function(dispatch, getState) {
    const userId = getState().userInfo.id;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        console.log(res);
      });
  }
}
