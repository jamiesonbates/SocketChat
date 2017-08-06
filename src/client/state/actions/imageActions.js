import axios from 'axios';

export function uploadImage({ data_uri, filename, filetype }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.post('/api/images', { data_uri, filename, filetype, userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('made it here');
        console.error(err);
      })
  }
}
