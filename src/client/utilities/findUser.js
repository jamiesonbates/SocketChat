function findUserName(usersList, userId) {
  let foundUser;

  for (const user of usersList) {
    if (user.id === userId) {
      foundUser = user;
    }
  }

  return foundUser;
}

export default findUserName;
