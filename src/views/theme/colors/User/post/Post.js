import React, { useRef } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { createUserAction } from "../../../../../store/actions/UserActions";
import {
  Checkbox,
  Form,
  FormControl,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "@contentful/f36-forms";
import { useDispatch } from "react-redux";

const Post = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const paperStyle = { padding: 20, width: 400, margin: "50px auto" };
  const headerStyle = { margin: 0 };

  const initialValues = {
    textInput: "",
    textarea: "",
    select: "",
    radioGroup: "",
    checkboxGroup: ["cricket"],
    checkbox: false,
    myfile: "",
  };

  const validationSchema = Yup.object().shape({
    textInput: Yup.string().min(6, "minimum 6 characters").required("required"),
    Textarea: Yup.string()
      .min(10, "minimum 10 characters")
      .required("required"),
    select: Yup.string().required("Required"),
    radioGroup: Yup.string().required("Required"),

    checkboxGroup: Yup.array().required("Required"),
  });

  // const validateRequired = (value) => !value;

  const filesharhe_ref = useRef();

  const onSubmit = (data) => {
    const userData = {
      textInput: data.textInput,
      textarea: data.textarea,
      select: data.select,
      radioGroup: data.radioGroup,
      checkboxGroup: data.checkboxGroup,
      myfile: data.myfile,
    };

    console.log(userData);
    dispatch(createUserAction(userData, props.history));
    navigate("/theme/post/read");
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>User Form</h2>
        </Grid>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="textInput"
                helperText={<ErrorMessage name="textInput" />}
              >
                {({ field }) => (
                  <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <TextInput {...field} />
                  </FormControl>
                )}
              </Field>

              <Field
                name="textarea"
                helperText={<ErrorMessage name="textarea" />}
              >
                {({ field }) => (
                  <FormControl>
                    <FormControl.Label>Address</FormControl.Label>
                    <Textarea {...field} />
                  </FormControl>
                )}
              </Field>

              <label> City : </label>
              <br />
              <Field name="select" helperText={<ErrorMessage name="select" />}>
                {({ field }) => (
                  <FormControl>
                    <Select {...field}>
                      <Select.Option value="" isDisabled Select>
                        Select City
                      </Select.Option>
                      <Select.Option value="Ahemdabad">Ahemdabad</Select.Option>
                      <Select.Option value="Broda">Broda</Select.Option>
                      <Select.Option value="Rajkot">Rajkot</Select.Option>
                    </Select>
                  </FormControl>
                )}
              </Field>

              <label>Gender : </label>
              <br />
              <Field
                name="radioGroup"
                helperText={<ErrorMessage name="radioGroup" />}
              >
                {({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                )}
              </Field>

              <br />
              <lable>Hobbies</lable>
              <br />
              <Field
                name="checkboxGroup"
                helperText={<ErrorMessage name="checkboxGroup" />}
              >
                {({ field }) => (
                  <Checkbox.Group {...field}>
                    <Checkbox value="reading">Reading</Checkbox>
                    <Checkbox value="traveling">travelling</Checkbox>
                    <Checkbox value="cricket">cricket</Checkbox>
                  </Checkbox.Group>
                )}
              </Field>

              <lable>Choose a File : </lable>
              <Field innerRef={filesharhe_ref} type="file" name="myfile" />
              <ErrorMessage name="myfile" />
              <br />

              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Post;
