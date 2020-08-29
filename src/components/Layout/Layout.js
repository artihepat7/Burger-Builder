import Aux from "../../hoc/Auxiliary";
import React from "react";
import classes from "./Layout.module.css";
const layout = (props) => {
  return (
    <Aux>
      <div>sidebar,toolbar</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
export default layout;
