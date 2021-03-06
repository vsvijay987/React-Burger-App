import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      'bacon': 0,
      'salad': 0,
      'cheese': 0,
      'meat': 0,
    }
  }

  render() {
    return (
      <Auxiliary>
        <Burger ingredients = {this.state.ingredients}/>
        <div>Build Control</div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
