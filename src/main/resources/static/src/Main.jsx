import React, { Component } from "react";
import axios from "axios";
import Showproducts from "./Showproducts.jsx";
import Showcart from "./Showcart.jsx";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

//******************* STRIPE
/*
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './Checkout.js';

const stripePromise = loadStripe("pk_test_dbD8PsCbi7pBzGJNlxU9x0m600FdK9S3jP");

<div class="col-6">
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
</div>
*/
//***************** STRIPE

const LogOutButton = withStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
}))(Button);

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      selection: [],
      currentUser: "",
      role:""
    };

    this.updateSelectionState = this.updateSelectionState.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.fetchCustomerName = this.fetchCustomerName.bind(this);
    this.clearSelectionState = this.clearSelectionState.bind(this);
  }

  clearSelectionState() {
    this.setState({selection: []});
  }

  updateSelectionState(name, description, cost, quantity) {
    const obj = {
      name: name,
      description: description,
      cost: cost,
      quantity: quantity,
    };

    let isObjectInSelection = this.state.selection.find(element => element.name == obj.name)
    
    if(!isObjectInSelection){
      this.state.selection.push(obj);
    } else {
      let indexOfItemObject = this.state.selection.findIndex(element => element.name == obj.name);
      this.state.selection[indexOfItemObject] = obj;
    }

    this.setState({ selection: this.state.selection });
  }

  removeItem(index) {
    this.state.selection.splice(index, 1);
    this.setState({ selection: this.state.selection });
  }

  fetchProducts() {
    axios.get(`/api/products`).then((response) => {
      this.setState({ products: response.data.content });
    });
  }

  fetchCustomerName() {
    axios.post(`/api/customers`).then((response) => {
      this.setState({ currentUser: response.data.name });
    });
  }

  fetchRole() {
    axios.get(`/api/role`).then((response) => {
      this.setState({role: response.data})
    });
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCustomerName();
    this.fetchRole();
  }

  render() {
    let adminPage = this.state.role === "[ROLE_ADMIN]" ? <div class="mx-2 px-2"><button
                onClick={(e) => {
                  location.href = "/admin/page";
                }}
                class="btn btn-light font-weight-bold"
              >Admin Page</button></div> : "";

    return (
      <div>
        <div
          id="header"
          class="navbar navbar-light bg-light d-flex justify-content-between"
        >
          <div>
            <span id="icon" class="navbar-brand mb-0 h1">
              <i class="fas fa-cloud"></i>Shopo2910
            </span>
          </div>
          <div class="d-flex justify-content-center">
            {adminPage}
            <button class="btn btn-light font-weight-bold" disabled
            >
              {this.state.currentUser}
            </button>
            <div class="mx-2">
              <button
                onClick={(e) => {
                  location.href = "/perform_logout";
                }}
                class="btn btn-light font-weight-bold"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <Showproducts
            products={this.state.products}
            checkOutToMain={this.updateSelectionState}
          />
          <Showcart
            userRole={this.state.role}
            currentUser={this.state.currentUser}
            selection={this.state.selection}
            removeItem={this.removeItem}
            updateProducts={this.fetchProducts}
            clearSelectionState={this.clearSelectionState}
          />
        </div>
      </div>
    );
  }
}
