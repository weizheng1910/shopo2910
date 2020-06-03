import React, {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

//******************* STRIPE
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Checkout.js";

const stripePromise = loadStripe(process.env.STRIPE_PROMISE);
//***************** STRIPE

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function PaymentModal(props) {
  const [items,setItems] = useState([])
  const[userRole,setUserRole] = useState("");

  useEffect(() => {
    setItems(props.items);
    setUserRole(props.userRole);
  }, [props]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        disabled={items.length == 0 || userRole == "[ROLE_ADMIN]"}
      >
        Purchase
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          <Elements stripe={stripePromise}>
            <CheckoutForm closeModal={handleClose} {...props} />
          </Elements>
        </Paper>
      </Modal>
    </div>
  );
}
