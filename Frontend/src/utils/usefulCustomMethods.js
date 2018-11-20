export const searchUserInArray = (array, userId) => {
  if (array.find(element => element.user.toString() === userId)) {
    return true;
  } else {
    return false;
  }
};
