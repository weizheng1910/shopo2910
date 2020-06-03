import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    width: 50 + "vw",
    height: 300 + "px",
    borderRadius: 10 + "px",
  },
}));

export default function Buy(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [quantity, setQuantity] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let validate = function () {
    let input = parseInt(quantity);
    if (isNaN(input) || input <= 0) {
      setErrorMsg("Please enter an integer greater than zero.");
      return;
    } else {
      if (input > props.quantity) {
        setErrorMsg("Not enough inventory!");
      } else {
        props.checkOutToProductCard(
          props.name,
          props.description,
          props.cost,
          quantity
        );
        handleClose();
      }
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Buy
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              style={{ textTransform: "capitalize" }}
              id="transition-modal-title"
            >
              {props.name}
            </h2>
            <p id="transition-modal-description">Price: $ {props.cost}</p>
            <p id="transition-modal-description">Inventory: {props.quantity}</p>
            <div>
              <TextField
                onChange={(evt) => {
                  setQuantity(Math.round(evt.target.value));
                }}
                type="number"
                id="standard-required"
                label="Purchase Quantity"
              />
            </div>
            <div className="small text-danger">{errorMsg}</div>
            <br></br>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={(evt) => {
                  validate();
                }}
              >
                {" "}
                Push to checkout
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
