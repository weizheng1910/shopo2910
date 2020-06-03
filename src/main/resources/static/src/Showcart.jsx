import React, { useState, useEffect, createContext } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";

import PaymentModal from "./PaymentModal.jsx";
//Intent: Getting props.selection, props.currentUser
import { api } from "./Checkout.js";

export const ShowcartApi = createContext(null);

export default function Showcart(props) {
  const [checkout, setCheckout] = useState({
    items: props.selection,
    customer: props.currentUser,
    userRole: props.userRole
  });

  useEffect(() => {
    setCheckout({
      items: props.selection,
      customer: props.currentUser,
      userRole: props.userRole,
    });
  }, [props]);

  let purchase = () => {
    axios
      .post(`/api/checkouts`, checkout)
      .then((res) => {
        props.clearSelectionState();
        props.updateProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const api = { purchase };

  const costMultiplyQuantity = function (cost, quantity) {
    return Math.round(parseFloat(cost) * parseInt(quantity) * 100) / 100;
  };

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const totalCost = props.selection
    .map((element) => costMultiplyQuantity(element.cost, element.quantity))
    .reduce(reducer, 0);

  return (
    <div component={Paper}>
      <h3>Checkout</h3>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.selection.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell
                  style={{ textTransform: "capitalize" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell align="right">$ {row.cost}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  $ {costMultiplyQuantity(row.cost, row.quantity)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      props.removeItem(index);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h4>Total</h4>
      <h2>$ {Math.round(totalCost * 100) / 100}</h2>
      <br></br>
      <ShowcartApi.Provider value={api}>
        <PaymentModal {...checkout} />
      </ShowcartApi.Provider>
      {/*<Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={(evt) => {
            this.purchase();
          }}
        >
          {" "}
          Purchase
        </Button>*/}
    </div>
  );
}
