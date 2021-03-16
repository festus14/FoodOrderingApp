import {
  SET_ORDERS,
  RESET_ORDERS,
  SET_SINGLE_ORDER,
} from '../actions/actionTypes';

const initialState = {
  openOrders: [],
  closedOrders: [],
  singleOrder: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        openOrders: action.openOrders,
        closedOrders: action.closedOrders,
      };

    case SET_SINGLE_ORDER:
      return {
        ...state,
        singleOrder: action.order,
      };

    case RESET_ORDERS:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
