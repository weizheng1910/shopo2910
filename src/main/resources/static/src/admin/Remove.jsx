import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
export default function Remove(props) {
  let deleteProduct = () => {
    axios
      .delete(`/api/products${props.iden}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={(evt) => {
        deleteProduct();
        props.fetch();
      }}
    >
      {" "}
      <DeleteIcon />
    </Button>
  );
}
