import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: "input",
        elementConfig: { type: "number", placeholder: "password" },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          maxLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuthHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

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

  inputChangedHandler = (event, controlIdentifier) => {
    let updatedControls = { ...this.state.controls };
    let updatedFormEl = { ...updatedControls[controlIdentifier] };
    updatedFormEl.value = event.target.value;

    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );

    updatedFormEl.touched = true;
    updatedControls[controlIdentifier] = updatedFormEl;
    this.setState({ controls: updatedControls });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let formElement = [];
    for (let key in this.state.controls) {
      formElement.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.authHandler}>
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
        <Button btnType="Success">Submit</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Controls}>
        {errorMessage}
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthHandler: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
