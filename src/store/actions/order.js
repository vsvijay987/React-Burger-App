import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
