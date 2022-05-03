import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import userInstance from "src/services/userInstance";
import { Grid, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const View = () => {
  const paperStyle = { padding: 20, width: 300, margin: "100px auto" };

  const { id } = useParams();
  const [user, setUser] = useState({});
  {
    console.log(id);
  }

  console.log("user", setUser);


  useEffect(() => {
    userInstance.get(`crud/${id}`).then((res) => setUser(res.data));
  }, []);
  console.log("user", user);
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h2>User Details </h2>
        </Grid>
        <ul>
          <li>id:{user.id}</li>
          <li>Name:{user.textInput}</li>
          <li>Adress:{user.textarea}</li>
          <li>city:{user.select}</li>
          <li>gender:{user.radioGroup}</li>
          <li>hobbies:{user.checkboxGroup}</li>
          <li>file:{user.myfile}</li>
        </ul>
        <button>
          <NavLink to="/theme/post/read">Back</NavLink>
        </button>
      </Paper>
    </Grid>
  );
};

export default View;
