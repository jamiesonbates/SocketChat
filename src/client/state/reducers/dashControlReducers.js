import {
  showChatType,
  showBookmarksType,
  showDefaultMainType,
  showChatsListType,
  showAddChatType,
  showGroupFormType,
  showUserProfileType
} from '../actionTypes';

export default function reducer(state={
  showBookmarks: false,
  showChat: false,
  showDefaultMain: true,
  showChatsList: true,
  showNewChat: false,
  showGroupForm: false,
  showUserProfile: false
}, action) {
  switch(action.type) {
    case showChatType:
      return {
        ...state,
        showBookmarks: false,
        showChat: true,
        showDefaultMain: false
      }

    case showBookmarksType:
      return {
        ...state,
        showBookmarks: true,
        showChat: false,
        showDefaultMain: false
      }

    case showDefaultMainType:
      return {
        ...state,
        showBookmarks: false,
        showChat: false,
        showDefaultMain: true
      }

    case showChatsListType:
      return {
        ...state,
        showChatsList: true,
        showAddChat: false,
        showGroupForm: false
      }

    case showAddChatType:
      return {
        ...state,
        showChatsList: false,
        showAddChat: true
      }
    case showGroupFormType:
      return {
        ...state,
        showGroupForm: true
      }
    case showUserProfileType:
      return {
        ...state,
        showUserProfile: true
      }
  }

  return state;
}
