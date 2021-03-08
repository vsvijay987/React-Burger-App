import React from "react";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ing) => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:
        {props.ingredients[ing]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType={"Danger"} clicked={props.cancelled}>CANCEL</Button>
      <Button btnType={"Success"} clicked={props.continued}>CONTINUE</Button>
    </Auxiliary>
  );
};

export default orderSummary;
