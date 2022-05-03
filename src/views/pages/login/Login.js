import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  loginConfirmedAction,
} from "../../../store/actions/AuthActions";

import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const isLoggedIn = useSelector((s) => s?.auth?.isLoggedIn);
  console.log(isLoggedIn);
  const paperStyle = { padding: 20, width: 300, margin: "100px auto" };
  const headerStyle = { margin: 0 };

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && navigate("/*");
  }, [isLoggedIn]);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(6, "Password minimum length should be 6")
      .required("Required"),
  });

  const onSubmit = (values) => {
    // console.log(values);
    // console.log(props);

    dispatch(loginAction(values.email, values.password)).catch((err) => {
      throw new Error("invalid login!");
    });

    // history.push("*");
    // if (loginConfirmedAction) {
    // } else {
    //   throw new Error("invalid login!");
    // }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          {props.showLoading && <Loader />}

          <h2 style={headerStyle}>Login</h2>
          {props.errorMessage && (
            <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
              {props.errorMessage}
            </div>
          )}
          {props.successMessage && (
            <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
              {props.successMessage}
            </div>
          )}
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />

              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                variant="contained"
                //disabled={props.isSubmitting}
                color="primary"
              >
                Login
                {/* {props.isSubmitting ? 'Loading' : 'Sign up'} */}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
