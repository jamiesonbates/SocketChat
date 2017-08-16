import axios from 'axios';

import { updateProfilePicType, stopProcessingImageType } from '../actionTypes';
import { updateUserProfile } from './uniqueUserActions';

export function uploadImage({ data_uri, filename, filetype }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const targetUserId = state.uniqueUserInfo.targetUserId;

    axios.post('/api/images', { data_uri, filename, filetype, userId })
    .then((res) => {
      const newUrl = res.data.cloudinary_url;

      dispatch({ type: updateProfilePicType, payload: newUrl });
      dispatch({ type: stopProcessingImageType });

      if (userId === targetUserId) {
        dispatch(updateUserProfile(userId));
      }
    })
    .catch((err) => {
      dispatch({ type: stopProcessingImageType });
      next(err);
    });
  }
}
