import React, { Component, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import axiosInstance from "./services/axiosInstance";
import AuthGuard from "./Authentication/Auth";
import "./scss/style.scss";

import * as ACTIONS from "./store/actions/AuthActions";
import store from "./store/store";

const token = JSON.parse(localStorage.getItem("authToken"));
const loggedInUser = JSON.parse(localStorage.getItem("user"));

if (token && loggedInUser) {
  store.dispatch(ACTIONS.authenticate(loggedInUser));
} else {
  store.dispatch({ type: ACTIONS.AUTHENTICATE_FAILED });
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route
              path="*"
              name="Home"
              element={
                <AuthGuard>
                  <DefaultLayout />
                </AuthGuard>
              }
            />
            // <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
