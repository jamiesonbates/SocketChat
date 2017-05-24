import { combineReducers } from 'redux';

import userInfo from './userReducers';
import errors from './errorReducers';

export default combineReducers({
  userInfo,
  errors
});
