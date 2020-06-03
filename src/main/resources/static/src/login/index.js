import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.jsx";

const inputs = [
  {
    name: "username",
  },
  {
    name: "password",
  },
];

const props = {
  name: "loginForm",
  method: "POST",
  action: "/perform_login",
  inputs: inputs,
};

ReactDOM.render(<Form {...props} />, document.getElementById("container"));
