import {
  createUser,
  formatUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../../services/UserServices";
import {
  CONFIRMED_CREATE_USER_ACTION,
  CONFIRMED_EDIT_USER_ACTION,
  CONFIRMED_DELETE_USER_ACTION,
  CONFIRMED_GET_USERS,
} from "./UserTypes";

export function deleteUserAction(userId, history) {
  return (dispatch, getState) => {
    deleteUser(userId).then((response) => {
      dispatch(confirmedDeleteUserAction(userId));
    });
  };
}

export function confirmedDeleteUserAction(userId) {
  return {
    type: CONFIRMED_DELETE_USER_ACTION,
    payload: userId,
  };
}

export function createUserAction(userData, history) {
  return (dispatch, getState) => {
    createUser(userData).then((response) => {
      const singleuser = {
        ...userData,
        id: response.data.name,
      };
      dispatch(confirmedCreateUserAction(singleuser));
    });
  };
}

export function getUsersAction() {
  return (dispatch, getState) => {
    getUser(id).then((response) => {
      let users = formatUsers(response.data);
      dispatch(confirmedGetUserAction(users));
    });
  };
}

export function confirmedCreateUserAction(singleUser) {
  return {
    type: CONFIRMED_CREATE_USER_ACTION,
    payload: singleUser,
  };
}

export function confirmedGetUserAction(users) {
  return {
    type: CONFIRMED_GET_USERS,
    payload: users,
  };
}

export function confirmedUpdateUserAction(user) {
  return {
    type: CONFIRMED_EDIT_USER_ACTION,
    payload: user,
  };
}

export const updateUserAction = (user) => (dispatch) => {
  return updateUser(user, user.id)
    .then((reponse) => {
      dispatch(confirmedUpdateUserAction(user));
      return reponse;
    })
    .catch((err) => {
      return err;
    });
};
