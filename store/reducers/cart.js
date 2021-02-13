import {
  SET_CART,
  UPDATE_CART,
  DELETE_CART,
  RESET_CART,
} from '../actions/actionTypes';

const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: [...state.cart, action.cart],
      };
    case UPDATE_CART:
      const newCart = state.cart.reduce((cart, item) => {
        if (cart.id === action.id) {
          item.count = item.count + action.itemData.count;
        }
        return [...cart, item];
      }, []);

      return {
        ...state,
        cart: newCart,
      };
    case DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((elem) => elem.id !== action.id),
      };
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
