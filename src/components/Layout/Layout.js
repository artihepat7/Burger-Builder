import Aux from "../../hoc/Auxiliary";
import React from "react";
const layout = (props) => {
  return (
    <Aux>
      <div>sidebar,toolbar</div>
      <main>{props.children}</main>
    </Aux>
  );
};
export default layout;
