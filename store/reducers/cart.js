import {
  SET_CART,
  UPDATE_CART,
  DELETE_CART,
  SET_CHECKOUT_INFO,
  RESET_CART,
} from '../actions/actionTypes';

const initialState = {
  cart: [],
  subtotal: 0,
  checkoutInfo: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: [...state.cart, action.cart],
        subtotal: state.subtotal + action.cart.price * action.cart.count,
      };
    case UPDATE_CART:
      let newSubtotal = 0;
      const newCart = state.cart.reduce((cart, item) => {
        if (item.id === action.id) {
          item.count = item.count + action.count;
        }
        newSubtotal += item.price * item.count;
        return [...cart, item];
      }, []);

      return {
        ...state,
        cart: newCart,
        subtotal: newSubtotal,
      };
    case DELETE_CART:
      let delSubtotal = 0;
      return {
        ...state,
        cart: state.cart.filter((item) => {
          if (item.id !== action.id) {
            delSubtotal += item.price * item.count;
            return item;
          }
        }),
        subtotal: delSubtotal,
      };
    case SET_CHECKOUT_INFO:
      return {
        ...state,
        checkoutInfo: {...state.checkoutInfo, ...action.info},
      };
    case RESET_CART:
      return {...state, cart: [], subtotal: 0};
    default:
      return state;
  }
};

export default {initialState, reducer};
