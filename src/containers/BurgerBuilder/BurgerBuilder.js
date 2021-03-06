import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        <BuildControls/>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
