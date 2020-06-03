import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";

import axios from "axios";

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

export default function Main() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    address: "",
    email: "",
  });

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleValidation(prop);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      console.log("invalid");
      return;
    }
    console.log("pass");
    
    axios.post(`/api/newAccount`, values).then((response) => {
      alert('New User created! Proceed with Login');
      location.href = "/";
    });
    
  };

  const handleValidation = (prop) => {
    event.preventDefault();

    switch (prop) {
      case "username":
        errors.username =
          values.username.length < 3
            ? "Full Name must be 4 characters long!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(values.email)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        errors.password =
          values.password.length < 8
            ? "Password must be 9 characters long!"
            : "";
        break;
      case "address":
        errors.address =
          values.address.length < 10 ? "Address is not valid!" : "";
      default:
        break;
    }
  };

  const isFormValid = () => {
    //object.keys

    let valid = true;
    for (const error of Object.values(errors)) {
      if (error.length > 0) {
        valid = false;
      }
    }

    return valid;
  };

 

  return (
    <Paper elevation={0} class={classes.box}>
      <div>
        <span>Have an account?</span> <a href="/">Log In</a>
      </div>
      {/*Can do a map here. */}
      <div class="mb-2">
        <TextField
          error={errors.username.length > 0}
          onChange={handleChange("username")}
          helperText={errors.username}
          value={values.username}
          label="Username"
          name="username"
        />
      </div>

      <div class="mb-2">
        <TextField
          error={errors.email.length > 0}
          helperText={errors.email}
          onChange={handleChange("email")}
          value={values.email}
          label="Email"
          name="email"
        />
      </div>
      <div class="mb-2">
        <TextField
          error={errors.address.length > 0}
          helperText={errors.address}
          onChange={handleChange("address")}
          value={values.address}
          label="Address"
          name="address"
        />
      </div>
      <div class="mb-2">
        <FormControl>
          <InputLabel className={errors.password.length > 0 ? "text-danger" : ""}>Password</InputLabel>
          <Input
            error={errors.password.length > 0}
            name="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText className="text-danger">{errors.password}</FormHelperText>
        </FormControl>
      </div>
      

      <Button
        variant="contained"
        color="primary"
        onClick={(evt) => {
          handleSubmit();
        }}
      >
        Create New User
      </Button>
    </Paper>
  );
}
