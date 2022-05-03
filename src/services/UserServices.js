import userInstance from "./userInstance";

export function getUser() {
  return userInstance.get(`crud`);
}

export function createUser(userData) {
  return userInstance.post(`crud`, userData);
}

export function updateUser(user, userId) {
  return userInstance.put(`crud/${userId}`, user);
}

export function deleteUser(userId) {
  return userInstance.delete(`crud/${userId}`);
}

export function formatUsers(userData) {
  let users = [];
  for (let key in userData) {
    users.push({ ...userData[key], id: key });
  }

  return users;
}
