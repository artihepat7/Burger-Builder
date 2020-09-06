import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h1>Enter Your Contact Data</h1>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <input type="text" placeholder="Your Street" />
        <input type="number" placeholder="Your PostalCode" />
        <Button btnType="Success">Order</Button>
      </div>
    );
  }
}
export default ContactData;
