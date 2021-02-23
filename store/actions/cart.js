import {
  SET_CART,
  UPDATE_CART,
  DELETE_CART,
  SET_CHECKOUT_INFO,
  RESET_CART,
} from './actionTypes';

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const updateCart = (id, count) => {
  return {
    type: UPDATE_CART,
    id,
    count,
  };
};

export const deleteCart = (id) => {
  return {
    type: DELETE_CART,
    id,
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const setCheckoutInfo = (info) => {
  return {
    type: SET_CHECKOUT_INFO,
    info,
  };
};

export const getCartSubtotal = () => {
  return async (dispatch, state) => {
    const cart = state.cart.cart;

    const subtotal = cart.reduce((sum, num) => sum + num, 0);
    return subtotal;
  };
};
