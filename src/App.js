import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Logout from "../src/containers/Auth/Logout/Logout";
import * as actions from "../src/store/actions/index";
import asyncComponent from "../src/hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("../src/containers/Checkout/Checkout");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncOrder = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  componentDidMount() {
    this.props.onLoadSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrder} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
