import {
  showChatType,
  showBookmarksType,
  showDefaultMainType,
  showChatsListType,
  showAddChatType,
  showGroupFormType
} from '../actionTypes';

export default function reducer(state={
  mainStatus: {
    showBookmarks: false,
    showChat: false,
    showDefaultMain: true
  },
  sideStatus: {
    showChatsList: true,
    showNewChat: false,
    showGroupForm: true,
    showNameGroup: false
  }
}, action) {
  switch(action.type) {
    case showChatType:
      return {
        ...state,
        mainStatus: {
          showBookmarks: false,
          showChat: true,
          showDefaultMain: false
        }
      }

    case showBookmarksType:
      return {
        ...state,
        mainStatus: {
          showBookmarks: true,
          showChat: false,
          showDefaultMain: false
        }
      }

    case showDefaultMainType:
      return {
        ...state,
        mainStatus: {
          showBookmarks: false,
          showChat: false,
          showDefaultMain: true
        }
      }

    case showChatsListType:
      return {
        ...state,
        sideStatus: {
          showChatsList: true,
          showAddChat: false
        }
      }

    case showAddChatType:
      return {
        ...state,
        sideStatus: {
          showChatsList: false,
          showAddChat: true
        }
      }
    case showGroupFormType:
      return {
        ...state,
        showGroupForm: true,
        showNameGroup: false
      }
  }

  return state;
}
