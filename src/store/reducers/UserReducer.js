import {
  CONFIRMED_CREATE_USER_ACTION,
  CONFIRMED_DELETE_USER_ACTION,
  CONFIRMED_EDIT_USER_ACTION,
  CONFIRMED_GET_USERS,
  CREATE_USER_ACTION,
} from "../actions/UserTypes";

const initialState = {
  users: [],
};

export default function UserReducer(state = initialState, actions) {
  if (actions.type === CREATE_USER_ACTION) {
    const user = {
      id: Math.random(),
      title: "Post Title 2asdasd",
      description: "Sample Description 2asdasdas",
    };

    const users = [...state.users];
    users.push(user);
    return {
      ...state,
      users,
    };
  }

  if (actions.type === CONFIRMED_DELETE_USER_ACTION) {
    const users = [...state.users];
    const userIndex = users.findIndex((user) => user.id === actions.payload);

    users.splice(userIndex, 1);

    return {
      ...state,
      users,
    };
  }

  if (actions.type === CONFIRMED_EDIT_USER_ACTION) {
    const users = [...state.users];
    const userIndex = users.findIndex((user) => user.id === actions.payload.id);

    users[userIndex] = actions.payload;
    return {
      ...state,
      users,
    };
  }

  if (actions.type === CONFIRMED_CREATE_USER_ACTION) {
    const users = [...state.users];
    users.push(actions.payload);

    return {
      ...state,
      users,
    };
  }

  if (actions.type === CONFIRMED_GET_USERS) {
    return {
      ...state,
      users: actions.payload,
    };
  }
  return state;
}
