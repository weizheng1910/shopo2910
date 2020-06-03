import React, { Component } from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: "",
    };

    this.inputChange = this.inputChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  inputChange(event, property) {
    let value = event.target.value;

    switch (
      property
      // case 'username': this.validate(property, value, /^([a-zA-Z0-9.]{4,})$/, 'Invalid username')
      //break;
      // case 'password': this.validate(property, value, /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/, 'Insecure password')
      //   break;
      // default:
      //  break;
    ) {
    }
    console.log("Input Change");
    console.log(property);
    console.log(value);
    console.log("InpuChange end ****");

    this.setState({ value: value });
    let valueToBeSubmitted = this.state.error ? "" : this.state.value;
    this.props.handleInput(property, value);
  }
  handleClickShowPassword() {
    this.setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  validate(name, value, validRegex, warnmsg) {
    const invalid = !value || !validRegex.test(value);
    console.log("invalid is ", invalid);
    let errorMessage = invalid ? warnmsg : "";
    this.setState({ error: errorMessage });
  }

  render() {
    const { name } = this.props;
    const { value, error, showPassword } = this.state;

    if (name == "password") {
      return (
        <FormControl error={error.length > 0}>
          <InputLabel>Password</InputLabel>
          <Input
            name={name}
            type={showPassword ? "text" : "password"}
            onChange={(evt) => {
              this.inputChange(evt, name);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => {
                    this.handleClickShowPassword();
                  }}
                  onMouseDown={(e) => {
                    this.handleMouseDownPassword(e);
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">{error}</FormHelperText>
        </FormControl>
      );
    } else {
      return (
        <div>
          <TextField
            onChange={(evt) => {
              this.inputChange(evt, name);
            }}
            helperText={error}
            error={error.length > 0}
            name={name}
            label="Username"
          />
          <br></br>
        </div>
      );
    }
  }
}
InputField.propTypes = {
  name: PropTypes.string,
};

export default InputField;
