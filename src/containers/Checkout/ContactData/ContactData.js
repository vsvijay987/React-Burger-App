import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      pincode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      address: {
        street: "Chopra colony",
        city: "Bishrampur",
        country: "India",
      },
      email: "vsvijju987@gmail.com",
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err) => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your name"
        />
        <input
          type="email"
          className={classes.Input}
          name="email"
          placeholder="Your email"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Street"
        />
        <input
          type="text"
          className={classes.Input}
          name="pin"
          placeholder="pin code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter your details here</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
