import Aux from "../../hoc/Auxiliary";
import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = { SideDrawerShow: false };
  SideDrawerClosedHandler = () => {
    this.setState({ SideDrawerShow: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { SideDrawerShow: !prevState.SideDrawerShow };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          clicked={this.SideDrawerClosedHandler}
          show={this.state.SideDrawerShow}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
