import Aux from "../../hoc/Auxiliary";
import React, { Component } from "react";
import { connect } from "react-redux";
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          clicked={this.SideDrawerClosedHandler}
          show={this.state.SideDrawerShow}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.tokenId != null,
  };
};

export default connect(mapStateToProps)(Layout);
