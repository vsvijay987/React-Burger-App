import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      'bacon': 1,
      'salad': 1,
      'cheese': 2,
      'meat': 2,
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
