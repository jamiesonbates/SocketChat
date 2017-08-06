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
  exitContactsListType,
  showEditProfileType,
  searchForOtherUsersType,
  stopSearchForOtherUsersType,
  startProcessingImageType,
  stopProcessingImageType
} from '../actionTypes';

export default function reducer(state={
  showBookmarks: false,
  showChat: false,
  showDefaultMain: true,
  showChatsList: true,
  showNewChat: false,
  showGroupForm: false,
  showUserProfile: false,
  showContactsList: false,
  showEditProfile: false,
  searchForOtherUsers: false,
  processingImage: false
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
        showGroupForm: false,
        showContactsList: false,
        searchForOtherUsers: false
      }

    case showAddChatType:
      return {
        ...state,
        showChatsList: false,
        showAddChat: true,
        showContactsList: false
      }
    case showGroupFormType:
      return {
        ...state,
        showGroupForm: true
      }
    case showUserProfileType:
      return {
        ...state,
        showUserProfile: true,
        showEditProfile: false
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
    case showEditProfileType:
      return {
        ...state,
        showEditProfile: true
      }

    case searchForOtherUsersType:
      return {
        ...state,
        searchForOtherUsers: true
      }

    case stopSearchForOtherUsersType:
      return {
        ...state,
        searchForOtherUsers: false
      }

      case stopProcessingImageType:
        return {
          ...state,
          processingImage: false
        }

      case startProcessingImageType:
        return {
          ...state,
          processingImage: true
        }
  }

  return state;
}
