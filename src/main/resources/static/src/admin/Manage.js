import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

import SimpleModal from "./Modal.jsx";

import Remove from "./Remove.jsx";

const useStyles = makeStyles((theme) => ({
  capitalize: {
    textTransform: "capitalize",
  },
}));

export default function Manage() {
  const classes = useStyles();
  let [products, setProducts] = React.useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  let fetchProducts = () => {
    axios.get(`/api/products`).then((response) => {
      setProducts(response.data.content);
    });
  };

  
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Manage Product and Inventories</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-weight-bold">Product Name</TableCell>
              <TableCell className="font-weight-bold" align="right">
                Serial Number
              </TableCell>
              <TableCell className="font-weight-bold" align="right">
                Price
              </TableCell>
              <TableCell className="font-weight-bold" align="right">
                Description
              </TableCell>
              <TableCell className="font-weight-bold" align="right">
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.product.name}>
                  <TableCell
                    className={classes.capitalize}
                    component="th"
                    scope="row"
                  >
                    {row.product.name}
                  </TableCell>
                  <TableCell align="right">{row.product.id}</TableCell>
                  <TableCell align="right">$ {row.product.cost}</TableCell>
                  <TableCell className={classes.capitalize} align="right">
                    {row.product.description}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    <SimpleModal
                      iden={row.product.id}
                      name={row.product.name}
                      cost={row.product.cost}
                      description={row.product.description}
                      image={row.product.image}
                      quantity={row.quantity}
                      fetch={fetchProducts}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Remove fetch={fetchProducts} iden={row.product.id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
