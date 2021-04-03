import React, { useEffect, useState } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    props.onInitPurchase();
  }, []) 

  const updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => {
        return ingredients[ing];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if(props.isAuthenticate){
      setPurchasing(true);
    }
    props.onSetAuthRedirectPath('/checkout');
    props.history.push("/auth");
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  };

  const purchaseContinueHandler = () => {
    
    props.history.push("/checkout");
  };

  
    const disabledInfo = { ...props.ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = props.error ? (
      <p>Can't retrieve the ingredients</p>
    ) : (
      <Spinner />
    );

    if (props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientsAdded}
            ingredientRemoved={props.onIngredientsRemoved}
            disabled={disabledInfo}
            price={props.price}
            purchasable={updatePurchase(props.ings)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticate}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={props.ings}
          price={props.price}
          cancelled={purchaseCancelHandler}
          continued={purchaseContinueHandler}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticate: state.auth.tokenId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));
