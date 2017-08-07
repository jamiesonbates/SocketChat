import React from 'react';
import { connect } from 'react-redux';

import { startedTyping, stoppedTyping } from '../state/actions/socketActions';
import { sendMessage, updateChatSeen, resetSingleChat } from '../state/actions/chatActions';
import { updateMain } from '../state/actions/dashControlActions';
import { updateUserProfile, updateTargetUserId } from '../state/actions/uniqueUserActions';
import { bookmarkMsg } from '../state/actions/bookmarkActions';

export default function(ComposedClass) {
  class WrapSingleChat extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  const findChat = function(allChats, chatId) {
    return allChats.reduce((acc, chat) => {
      if (chat.id === chatId) {
        console.log(chat);
        acc = chat;
      }

      return acc;
    });
  }

  const findLastSeen = function(state) {
    const lastSeen = state.chats.chatLastSeen;
    const chatId = state.chats.singleChat;

    return lastSeen.reduce((acc, chat) => {
      if (chat.chatId === chatId) {
        acc = chat;
      }

      return acc;
    })
  }

  const findNewMessages = function(state) {
    const newMessages = state.chats.chatNewMessages;
    const chatId = state.chats.singleChat;

    return newMessages.reduce((acc, chat) => {
      if (chat.chatId === chatId) {
        acc = chat;
      }

      return acc;
    })
  }

  const mapStateToProps = function(state) {
    const lastSeen = findLastSeen(state);
    const newMessages = findNewMessages(state);


    return {
      lastSeen,
      newMessages,
      chatId: state.chats.singleChat,
      currentChat: state.chats.currentChat,
      currentChatMessages: state.chats.currentChatMessages,
      currentChatUsers: state.chats.currentChatUsers,
      userId: state.userInfo.id,
      usersOnline: state.chats.usersOnline,
      chatsWithTyping: state.chats.chatsWithTyping,
      categories: state.userInfo.categories
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      sendMessage: (data) => dispatch(sendMessage(data)),
      startedTyping: (data) => dispatch(startedTyping(data)),
      stoppedTyping: (data) => dispatch(stoppedTyping(data)),
      updateMain: (data) => dispatch(updateMain(data)),
      updateTargetUserId: (data) => dispatch(updateTargetUserId(data)),
      updateUserProfile: (data) => dispatch(updateUserProfile(data)),
      bookmarkMsg: (data) => dispatch(bookmarkMsg(data)),
      updateChatSeen: (data) => dispatch(updateChatSeen(data)),
      resetSingleChat: () => dispatch(resetSingleChat())
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(WrapSingleChat);
}
