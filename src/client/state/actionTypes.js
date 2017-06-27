'use strict';

const authSuccess = 'AUTH_SUCCESS';
const authFailure = 'AUTH_FAILURE';
const loginSuccess = 'LOGIN_SUCCESS';
const loginFailure = 'LOGIN_FAILURE';
const signupSuccess = 'SIGNUP_SUCCESS';
const signupFailure = 'SIGNUP_FAILURE';
const chatsSuccess = 'CHATS_SUCCESS';
const newSingleChat = 'NEW_SINGLE_CHAT';
const addNewMessage = 'ADD_NEW_MESSAGE';
const updateSingleChat = 'UPDATE_SINGLE_CHAT';
const userNowOnline = 'USER_NOW_ONLINE';
const userNowOffline = 'USER_NOW_OFFLINE';
const connectType = 'CONNECT';
const disconnectType = 'DISCONNECT';
const manageRoomType = 'MANAGE_ROOM';
const sendMessageType = 'SEND_MESSAGE';
const startedTypingType = 'STARTED_TYPING';
const stoppedTypingType = 'STOPPED_TYPING';
const someoneStartedTypingType = 'SOMEONE_STARTED_TYPING';
const someoneStoppedTypingType = 'SOMEONE_STOPPED_TYPING';
const notifyCommonUsersType = 'NOTIFY_COMMON_USERS';
const setUsersOnlineType = 'SET_USERS_ONLINE';
const showChatType = 'SHOW_CHAT';
const showBookmarksType = 'SHOW_BOOKMARKS';
const showDefaultMainType = 'SHOW_DEFAULT_MAIN';
const showChatsListType = 'SHOW_CHATS_LIST';
const showAddChatType = 'SHOW_ADD_CHAT';
const showGroupFormType = 'SHOW_GROUP_FORM';
const updateGroupNameType = 'UPDATE_GROUP_NAME';
const updateSearchTermType = 'UPDATE_SEARCH_TERM';
const updateContactsType = 'UPDATE_CONTACTS';
const addNewGroupMemberType = 'ADD_NEW_GROUP_MEMBER';
const setUserProfileType = 'SET_USER_PROFILE';
const resetUserProfileType = "RESET_USER_PROFILE";
const noUserProfileMatchType = 'NO_USER_PROFILE_MATCH';
const showUserProfileType = 'SHOW_USER_PROFILE';
const exitUserProfileType = 'EXIT_USER_PROFILE';
const setTargetUserIdType = 'SET_TARGET_USERID';

export {
  authSuccess,
  authFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  updateSingleChat,
  userNowOnline,
  userNowOffline,
  connectType,
  disconnectType,
  manageRoomType,
  sendMessageType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType,
  notifyCommonUsersType,
  setUsersOnlineType,
  showChatType,
  showBookmarksType,
  showDefaultMainType,
  showChatsListType,
  showAddChatType,
  showGroupFormType,
  updateGroupNameType,
  updateSearchTermType,
  updateContactsType,
  addNewGroupMemberType,
  setUserProfileType,
  resetUserProfileType,
  noUserProfileMatchType,
  showUserProfileType,
  exitUserProfileType,
  setTargetUserIdType
}
