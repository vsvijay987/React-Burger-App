import React from "react";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ing) => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span>:{props.ingredients[ing]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Auxiliary>
  );
};

export default orderSummary;
