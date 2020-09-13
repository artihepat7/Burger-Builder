import React from "react";
import classes from "./Order.module.css";
const Order = (props) => {
  const Ingredients = [];
  for (let ingredientName in props.ingredients) {
    Ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  const ingredientOutput = Ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        border: "1px solid #ccc",
        margin: "0 5px",
        textTransform: "capitalize",
        padding: "5px",
        display: "inline-block",
      }}
    >
      {ig.name}({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        price:<strong>Rs.{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
