import {SET_ORDERS, RESET_ORDERS} from '../actions/actionTypes';

const initialState = {
  openOrders: [],
  closedOrders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        openOrders: action.openOrders,
        closedOrders: action.closedOrders,
      };

    case RESET_ORDERS:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
