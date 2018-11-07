module.exports.searchUserInArray = (array, userId) => {
  if (array.find(element => element.user.toString() === userId)) {
    return true;
  } else {
    return false;
  }
};

module.exports.addUserInArray = (array, userId) => {
  return new Promise((resolve, reject) => {
    array.unshift({ user: userId });
    resolve(array);
  });
};

module.exports.deleteUserInArray = (array, userId) => {
  return new Promise((resolve, reject) => {
    const removeIndex = array.map(item => item.user.toString()).indexOf(userId);
    array.splice(removeIndex, 1);
    resolve(array);
  });
};
