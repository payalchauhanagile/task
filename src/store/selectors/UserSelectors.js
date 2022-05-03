import { createSelector } from "reselect";

export const getUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export const getUser = () => createSelector([getUserById], (user) => user);
