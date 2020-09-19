import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "Salad" },
  { label: "Bacon", type: "Bacon" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((item) => {
        return (
          <BuildControl
            key={item.label}
            label={item.label}
            added={props.ingredientsAdded.bind(this, item.type)}
            removed={() => props.ingredientsRemoved(item.type)}
            disabled={props.disabled[item.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        {props.isAuth ? "Order Now" : "sign Up to Continue"}
      </button>
    </div>
  );
};

export default buildControls;
