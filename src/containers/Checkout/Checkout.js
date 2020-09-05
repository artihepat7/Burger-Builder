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
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <CheckoutSummery
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
    );
  }
}

export default Checkout;
