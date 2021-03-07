import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  bacon: 25,
  salad: 10,
  cheese: 20,
  meat: 40,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 100,
    purchasable: false,
    purchasing: false
  };

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => {
        return ingredients[ing];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = newCount;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = newCount;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchase(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  modalClosedHandler = () => {
    this.setState({purchasing: false})
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal show = {this.state.purchasing} modalClosed ={this.modalClosedHandler}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
