import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  tokenId: null,
  userId: null,
  loading: false,
  error: null,
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    tokenId: action.tokenId,
    userId: action.userId,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authlogout = (state, action) => {
  return updateObject(state, {
    tokenId: null,
    userId: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authlogout(state, action);
    default:
      return state;
  }
};

export default reducer;
