import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10 + 'px'
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
} 

export default function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
      console.log('invalid')
      return;
    }

    const data = {
      name: nameInputDOM.current.value,
      description: descriptionInputDOM.current.value,
      cost: costInputDOM.current.value,
      quantity: quantityInputDOM.current.value,
      image: imageInputDOM.current.value,
    };

    axios
      .put(`/api/products/${props.iden}`, data)
      .then((response) => {
        console.log(response.data);
        props.fetch();
        handleClose();
      });
  };

  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <div>
        <TextField
          error={nameInputError}
          helperText={nameInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={nameInputDOM}
          variant="standard"
          label="Product Name"
          defaultValue={props.name}
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
          defaultValue={props.description}
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
          defaultValue={props.cost}
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
          defaultValue={props.quantity}
        />
      </div>

      <div>
        <TextField
          error={imageInputError}
          helperText={imageInputError ? "Empty field!" : " "}
          InputLabelProps={{ shrink: true }}
          inputRef={imageInputDOM}
          variant="standard"
          label="Image"
          defaultValue={props.image}
        />
      </div>
      <br></br>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        endIcon={<SaveIcon />}
      >
        Save Changes
      </Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {" "}
        <EditIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
