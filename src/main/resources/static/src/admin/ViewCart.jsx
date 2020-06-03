import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 50 + 'vw',
    height: 50 + 'vh',
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function ViewCart(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checkouts, setCheckouts] = React.useState([]);
  const [user, setUser] = React.useState({
    email: '',
    address: ''
  });

  const fetchCartDetails = () => {
    axios.get(`/api/checkouts/${props.cartId}`).then((res) => {
      setCheckouts(res.data);
    })
  }

  const fetchUserDetails = () => {
    axios.get(`/api/users/${props.customer}`).then((res) => {
       let resultString = res.data.split(",")
       console.log(resultString)
      setUser({
        email: resultString[0],
        address: resultString[1]
      })
    })
  }

  const handleOpen = () => {
    setOpen(true);
    fetchCartDetails();
    fetchUserDetails();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const totalCost = checkouts
    .map((element) => (element.product.cost * element.quantity))
    .reduce(reducer, 0);


  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="secondary"
      >
        View Cart
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
          <div class='mx-3 mt-4'>Customer: {props.customer}</div>
          <div class='mx-3'>Purchased at: {props.time}</div>
          <div class='mx-3'>Customer Email: {user.email}</div>
          <div class='mx-3'>Customer Address: {user.address}</div>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Item name</TableCell>
            <TableCell align="right">Item Description</TableCell>
            <TableCell align="right">Unit Cost</TableCell>
            <TableCell align="right">Purchase Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkouts.map((row) => (
            <TableRow key={row.product.id}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell align="right">{row.product.description}</TableCell>
              <TableCell align="right">{row.product.cost}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{ Math.round(row.product.cost * row.quantity * 100)/ 100 }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            <div class="mx-3 my-2">Grand Total: { Math.round(totalCost * 100) / 100 }</div>
    </TableContainer>
        </Paper>
      </Modal>
    </div>
  );
}
