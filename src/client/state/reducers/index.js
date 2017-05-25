import { combineReducers } from 'redux';

import userInfo from './userReducers';
import errors from './errorReducers';
import chats from './chatReducers';

export default combineReducers({
  userInfo,
  errors,
  chats
});
