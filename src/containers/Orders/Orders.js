import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios.orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../../src/components/UI/Spinner/Spinner";

class orders extends Component {
  componentDidMount() {
    this.props.onFetchHandler();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredientsAdded}
            price={order.price}
          />
        );
      });
    }
    //
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { onFetchHandler: () => dispatch(actions.fetchBurger()) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
