import React, { useRef, useEffect, useState } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { updateUserAction } from "../../../../../store/actions/UserActions";

import {
  Checkbox,
  Form,
  FormControl,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "@contentful/f36-forms";
import userInstance from "src/services/userInstance";
import { useDispatch } from "react-redux";

const Update = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();
  const [initialValues, setInitialValues] = useState({});

  const paperStyle = { padding: 20, width: 400, margin: "50px auto" };
  const headerStyle = { margin: 0 };

  const validateRequired = (value) => !value;

  useEffect(async () => {
    await userInstance.get(`crud/${id}`).then((res) =>
      setInitialValues({
        textInput: res.data.textInput,
        textarea: res.data.textarea,
        select: res.data.select,
        radioGroup: res.data.radioGroup,
        checkboxGroup: res.data.checkboxGroup,
        // myfile: res.data.myfile,
      })
    );
  }, [id]);
  console.log(initialValues);
  const onInputChange = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
  };
  const filesharhe_ref = useRef();

  const onSubmit = async (values) => {
    dispatch(updateUserAction({ ...values, id })).then((res) => {
      console.log(res);
      navigate("/theme/post/read");
    });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Update User Data</h2>
        </Grid>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Field
                name="textInput"
                validate={validateRequired}
                onChange={(e) => onInputChange(e)}
              >
                {({ field, meta }) => (
                  <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
                    <FormControl.Label>Name</FormControl.Label>
                    <TextInput {...field} />

                    {meta.touched && meta.error && (
                      <FormControl.ValidationMessage>
                        {meta.error}
                      </FormControl.ValidationMessage>
                    )}
                  </FormControl>
                )}
              </Field>

              <Field
                name="textarea"
                validate={validateRequired}
                onChange={(e) => onInputChange(e)}
              >
                {({ field, meta }) => (
                  <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
                    <FormControl.Label>Address</FormControl.Label>
                    <Textarea {...field} />

                    {meta.touched && meta.error && (
                      <FormControl.ValidationMessage>
                        {meta.error}
                      </FormControl.ValidationMessage>
                    )}
                  </FormControl>
                )}
              </Field>

              <label> City : </label>
              <br />
              <Field
                name="select"
                validate={validateRequired}
                onChange={(e) => onInputChange(e)}
              >
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
                validate={validateRequired}
                onChange={(e) => onInputChange(e)}
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
                validate={validateRequired}
                onChange={(e) => onInputChange(e)}
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
              <Field
                innerRef={filesharhe_ref}
                type="file"
                name="myfile"
                validate={validateRequired}
              />
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

export default Update;
