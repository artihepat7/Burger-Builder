import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      Salad: 1,
      Bacon: 1,
      Cheese: 2,
      Meat: 2,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Burger Control</div>
      </Aux>
    );
  }
}
export default BurgerBuilder;
