import axios from "axios";
import store from "../store/store";
import { logout } from "src/store/actions/AuthActions";
// import logout from "../store/actions/AuthActions";

const axiosInstance = axios.create({
  baseURL: `https://test-fb6c3-default-rtdb.firebaseio.com/`,
});

const token = JSON.parse(localStorage.getItem("authToken"));

if (token) {
  axiosInstance.defaults.headers.common["authorization"] = token;
} else {
  axiosInstance.defaults.headers.common["authorization"] = null;
}

axios.interceptors.response.use(null, (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch({
        type: logout,
      });
      return Promise.reject(error);
    } else return Promise.reject(error);
  } else if (error.request) {
    let err = {
      response: {
        data: {
          message: "Something went wrong,Please try again later!!!",
        },
      },
    };
    return Promise.reject(err);
  }
});

// axiosInstance.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.auth.auth.idToken;
//   config.params = config.params || {};
//   config.params["auth"] = token;

//   return config;
// });

export default axiosInstance;
