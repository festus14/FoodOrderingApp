import {SET_CART, UPDATE_CART, DELETE_CART, RESET_CART} from './actionTypes';
import {cartUiStartLoading} from './';

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const updateCart = (id, itemData) => {
  return {
    type: UPDATE_CART,
    id,
    itemData,
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
