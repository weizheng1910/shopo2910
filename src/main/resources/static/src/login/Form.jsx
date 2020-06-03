import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./Input.jsx";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  box: {
    width: "280px",
    height: "280px",
    position: "absolute",
    top: "50%",
    left: "0&",
    marginTop: "-140px",
  },
}));

export default function Form(props) {
  const handleSubmit = (event) => {
    console.log("sds", userLogin);

    let isFormValid = true;
    for (const value of Object.values(userLogin)) {
      if (value.length == 0) {
        isFormValid = false;
      }
    }

    const data = new FormData();
    console.log("USERNAME", userLogin.username);
    console.log("PASSWORD", userLogin.password);
    data.append("username", userLogin.username);
    data.append("password", userLogin.password);

    if (isFormValid == true) {
      fetch("perform_login", {
        method: "POST",
        body: new URLSearchParams(data),
      })
        .then((v) => {
          console.log(v);
          if (v.redirected) window.location = v.url;
        })
        .catch((e) => console.warn(e));
    }
  };

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const setData = (property, value) => {
    console.log("setData");
    console.log(property);
    console.log(value);
    console.log("setDataEnd");
    setUserLogin((prevState) => ({ ...prevState, [property]: value }));
  };

  const inputs = props.inputs.map(({ name }, index) => (
    <InputField
      key={index}
      name={name}
      handleInput={(property, value) => setData(property, value)}
    />
  ));

  const classes = useStyles();

  return (
    <div class={classes.box}>
      <div>
        <span>No account yet?</span> <a href="/register">Register</a>
      </div>
      <div>{inputs}</div>
      <br></br>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={(evt) => {
            handleSubmit();
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
