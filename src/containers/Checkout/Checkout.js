import React, { Component } from "react";
import CheckoutSummery from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredients: {
      Salad: 1,
      Bacon: 1,
      Cheese: 1,
      Meat: 1,
    },
  };
  render() {
    return <CheckoutSummery ingredients={this.state.ingredients} />;
  }
}

export default Checkout;
