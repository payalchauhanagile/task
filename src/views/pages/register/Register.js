import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'

import { connect, useDispatch } from "react-redux";
import {
  signupAction,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";

import Loader from "../../../components/Loader/Loader";

const Register = (props) => {
  const navigate = useNavigate();

  const paperStyle = { padding: 20, width: 300, margin: "100px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(6, "Password minimum length should be 6")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
  });
  const onSubmit = (values, props) => {
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(values.email, values.password, props.history));
    console.log(values);
    navigate("/register");
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          {props.showLoading && <Loader />}
          <h2 style={headerStyle}>Register User</h2>

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
                name="name"
                label="Name"
                placeholder="Enter your name"
                helperText={<ErrorMessage name="name" />}
              />
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
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                type="submit"
                variant="contained"
                //disabled={props.isSubmitting}
                color="primary"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};
const mapStateToProps = (state, props) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register);
