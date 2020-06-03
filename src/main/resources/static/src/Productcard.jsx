import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Buy from "./Buy.jsx";
require("./Productcard.css");

export default class Productcard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card id="card-container" className="m-4">
        <CardContent>

          <Typography
            id="card-product-name"
            variant="h5"
            component="h2"
          >
            {this.props.name}
          </Typography>

          <img id="card-image" src={this.props.image} />

          <Typography
            id="card-product-description"
            color="textSecondary"
          >
            {this.props.description}
          </Typography>

          <Typography variant="body2" component="p">
            Price $ {this.props.cost}
          </Typography>

          <Typography variant="body2" component="p">
            Quantity {this.props.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Buy
            name={this.props.name}
            cost={this.props.cost}
            description={this.props.description}
            quantity={this.props.quantity}
            checkOutToProductCard={(a, b, c, d) => {
              this.props.checkOutToShowproducts(a, b, c, d);
            }}
          />
        </CardActions>
      </Card>
    );
  }
}
