import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map((ig) => {
    return [...Array(props.ingredients[ig])].map((_, index) => {
      return <BurgerIngredient type={ig} key={ig + index} />;
    });
  });

  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="BreadTop" />
      {transformedIngredients}
      <BurgerIngredient type="BreadBottom" />
    </div>
  );
};

export default burger;
