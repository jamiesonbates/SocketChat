function findChat(chats, id) {
  for (const chat of chats) {
    if (chat.id === id || chat.chatId === id) {
      return chat;
    }
  }

  return null;
}

export default findChat;
