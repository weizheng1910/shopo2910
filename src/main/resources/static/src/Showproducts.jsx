import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Productcard from "./Productcard.jsx";
import TablePagination from "@material-ui/core/TablePagination";

export default class Showproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 4
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangePage(event, newPage) {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage(event){
    this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
  };

  render() {
    const {page , rowsPerPage} = this.state;
    const { products } = this.props;

    return (
      <div className="col-7">
        <div className="d-flex flex-wrap justify-content-between">
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((element) => (
            <Productcard
              key={element.product.name}
              name={element.product.name}
              cost={element.product.cost}
              description={element.product.description}
              image={element.product.image}
              quantity={element.quantity}
              checkOutToShowproducts={(a, b, c, d) => {
                this.props.checkOutToMain(a, b, c, d);
              }}
            />
          ))}
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[4, 8, 16]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  }
}
