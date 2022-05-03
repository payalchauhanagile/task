import axios from "axios";
import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const AUTHENTICATE_USER = "authenticate user";
export const AUTHENTICATE_FAILED = "authenticate failed";

export function signupAction(email, password, history) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(confirmedSignupAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem("userDetails");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export const loginAction = (email, password) => (dispatch) => {
  return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcyNtrrzecEJPfecz8K5QCP7qlfqNuLso`,
      { email, password, returnSecureToken: true }
    )
    .then((response) => {
      localStorage.setItem("authToken", JSON.stringify(response.data.idToken));
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(loginConfirmedAction(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = formatError(error.response?.data);
      dispatch(loginFailedAction(errorMessage));
      if (error instanceof Response) {
        switch (error.status) {
          case 401:
            throw new Error("Invalid login credentials");
          /* ... */
          default:
            throw new Error(
              `Unknown server error occured: ${error.statusText}`
            );
        }
      }
      throw new Error(`Something went wrong: ${error.message || error}`);
    });
};

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export const authenticate = (user) => (dispatch) => {
  if (user) {
    return dispatch({ type: AUTHENTICATE_USER, payload: user });
  } else {
    return dispatch({ type: AUTHENTICATE_FAILED });
  }
};
