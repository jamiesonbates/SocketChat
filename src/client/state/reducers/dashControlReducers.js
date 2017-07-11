import {
  showChatType,
  showBookmarksType,
  showDefaultMainType,
  showChatsListType,
  showAddChatType,
  showGroupFormType,
  showUserProfileType,
  exitUserProfileType,
  showContactsListType,
  exitContactsListType
} from '../actionTypes';

export default function reducer(state={
  showBookmarks: false,
  showChat: false,
  showDefaultMain: true,
  showChatsList: true,
  showNewChat: false,
  showGroupForm: false,
  showUserProfile: false,
  showContactsList: false
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
    case exitUserProfileType:
      return {
        ...state,
        showUserProfile: false
      }

    case showContactsListType:
      return {
        ...state,
        showContactsList: true,
        showChatsList: false
      }

    case exitContactsListType:
      return {
        ...state,
        showContactsList: false,
        showChatsList: true
      }
  }

  return state;
}
