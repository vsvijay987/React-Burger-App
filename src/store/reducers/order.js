import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, { loading: true });

    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, { loading: false, orders: action.orders });

    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, { loading: false });

    default:
      return state;
  }
};

export default reducer;
