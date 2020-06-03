import React, { useState, useEffect } from "react";
import axios from "axios";

//
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import TableSortLabel from "@material-ui/core/TableSortLabel";
//
import ViewCart from "./ViewCart.jsx"

const moment = require("moment");
require("moment/locale/en-gb");

// Table head ***************************************************************

const headCells = [
  { id: "id", alignRight: false, label: "Serial ID" },
  { id: "purchasedAt", alignRight: true, label: "Time of Purchase" },
  { id: "name", alignRight: true, label: "Customer Name" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.alignRight ? "right" : "left"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ***************************************************************************************

export default function View() {
  useEffect(() => {
    fetchCarts();
  }, []);

  let [carts, setCarts] = useState([]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let fetchCarts = () => {
    axios.get(`/api/carts`).then((response) => {
      let resultArray = response.data.map((obj) => {
        let rObj = {};
        rObj["id"] = obj.id;
        rObj["purchasedAt"] = moment(obj.purchasedAt).format("LLL");
        rObj["name"] = obj.customer.name;
        return rObj;
      });
      setCarts(resultArray);
    });
  };

  // Sorting functions *****************************************

  function ascendingComparator(a, b, orderBy) {
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "asc"
      ? (a, b) => ascendingComparator(a, b, orderBy)
      : (a, b) => -ascendingComparator(a, b, orderBy);
  }

  function sortArray(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // ***********************************************************

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // *************************************************************************
  

  return (
    <div>
      <h2>Purchase History</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortArray(carts, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cart) => (
              <TableRow key={cart.id}>
                <TableCell component="th" scope="row">
                  {cart.id}
                </TableCell>
                <TableCell align="right">{cart.purchasedAt}</TableCell>
                <TableCell align="right">{cart.name}</TableCell>
                <TableCell align="right">
                  <ViewCart cartId={cart.id} customer={cart.name} time={cart.purchasedAt} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={carts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
