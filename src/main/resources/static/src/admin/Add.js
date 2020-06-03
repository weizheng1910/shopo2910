import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";

export default function Add() {
  let nameInputDOM = React.useRef();
  let descriptionInputDOM = React.useRef();
  let costInputDOM = React.useRef();
  let quantityInputDOM = React.useRef();
  let imageInputDOM = React.useRef();

  let [costInputError, setCostInputError] = React.useState(false);
  let [nameInputError, setNameInputError] = React.useState(false);
  let [descriptionInputError, setDescriptionInputError] = React.useState(false);
  let [quantityInputError, setQuantityInputError] = React.useState(false);
  let [imageInputError, setImageInputError] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let validate = () => {
    // Shouldnt be empty if not show error
    let isInputClean = true;

    if (nameInputDOM.current.value == "" || null) {
      isInputClean = false;
      setNameInputError(true);
    } else {
      setNameInputError(false);
    }

    if (costInputDOM.current.value == "" || isNaN(costInputDOM.current.value)) {
      isInputClean = false;
      setCostInputError(true);
    } else {
      setCostInputError(false);
    }

    if (descriptionInputDOM.current.value == "" || null) {
      isInputClean = false;
      setDescriptionInputError(true);
    } else {
      setDescriptionInputError(false);
    }

    if (quantityInputDOM.current.value == "" || null) {
      isInputClean = false;
      setQuantityInputError(true);
    } else {
      setQuantityInputError(false);
    }

    if (imageInputDOM.current.value == "" || null) {
      isInputClean = false;
      setImageInputError(true);
    } else {
      setImageInputError(false);
    }

    return isInputClean;
  };

  let handleSubmit = () => {
    if (validate() == false) {
      console.log("something wrong!");
      return;
    }
    const data = {
      name: nameInputDOM.current.value,
      description: descriptionInputDOM.current.value,
      cost: costInputDOM.current.value,
      quantity: quantityInputDOM.current.value,
      image: imageInputDOM.current.value
    };

    axios.post(`/api/products`, data).then((response) => {
      console.log(response.data);
    });
  };

  let clearInput = () => {
    nameInputDOM.current.value = "";
    descriptionInputDOM.current.value = "";
    costInputDOM.current.value = "";
    quantityInputDOM.current.value = "";
    imageInputDOM.current.value = "";
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <div>
        <TextField
          error={nameInputError}
          helperText={nameInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={nameInputDOM}
          variant="standard"
          label="Product Name"
        />
      </div>
      <br></br>
      <div>
        <TextField
          error={descriptionInputError}
          helperText={descriptionInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={descriptionInputDOM}
          variant="standard"
          label="Product Description"
        />
      </div>
      <br></br>
      <div>
        <TextField
          error={costInputError}
          helperText={costInputError ? "Please enter a number." : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={costInputDOM}
          variant="standard"
          label="Product Cost"
        />
      </div>
      <br></br>
      <div>
        <TextField
          error={quantityInputError}
          helperText={quantityInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={quantityInputDOM}
          type="number"
          variant="standard"
          label="Product Quantity"
        />
      </div>
      <br></br>

      <div>
        <TextField
          error={imageInputError}
          helperText={imageInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={imageInputDOM}
          variant="standard"
          label="Image Link"
        />
      </div>
      <br></br>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={(e) => {
          handleClick();
          handleSubmit();
          clearInput();
        }}
      >
        Enter Product
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message="Product created"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
