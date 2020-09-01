import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ig) => {
      return [...Array(props.ingredients[ig])].map((_, index) => {
        return <BurgerIngredient type={ig} key={ig + index} />;
      });
    })
    .reduce((arr, curr) => {
      return arr.concat(curr);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start adding ingredients!</p>;
  }
  //console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="BreadTop" />
      {transformedIngredients}
      <BurgerIngredient type="BreadBottom" />
    </div>
  );
};

export default burger;
