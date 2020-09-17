import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Street" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: { type: "number", placeholder: "ZIP Code" },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Email" },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "Fastest",
        valid: true,
        validation: {},
      },
    },

    formIsValid: false,
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let inputIdent in this.state.orderForm) {
      formData[inputIdent] = this.state.orderForm[inputIdent].value;
      //formData={email:""}
    }

    const order = {
      ingredientsAdded: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
    };

    this.props.onOrder(order);
  };

  //validation
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...this.state.orderForm };
    let updatedFormEl = { ...updatedOrderForm[inputIdentifier] };
    updatedFormEl.value = event.target.value;

    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormEl;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElement = [];
    for (let key in this.state.orderForm) {
      formElement.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElement.map((formEl) => {
          return (
            <Input
              key={formEl.id}
              elementType={formEl.config.elementType}
              elementConfig={formEl.config.elementConfig}
              value={formEl.config.value}
              changed={(event) => this.inputChangedHandler(event, formEl.id)}
              shouldValidate={formEl.config.validation}
              Invalid={!formEl.config.valid}
              touched={formEl.config.touched}
              valueType={formEl.id}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter Your Contact Data</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ings: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (order) => {
      dispatch(actions.postOrderStart(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
