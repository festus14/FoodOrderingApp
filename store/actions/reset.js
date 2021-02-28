import {
  RESET_AUTH,
  RESET_USER,
  RESET_VENDORS,
  RESET_CART,
  RESET_ORDERS,
  RESET_ORDER_CHAT,
  RESET_UI,
} from './actionTypes';

export const resetApp = () => {
  return async (dispatch) => {
    dispatch({type: RESET_AUTH});
    dispatch({type: RESET_VENDORS});
    dispatch({type: RESET_USER});
    dispatch({type: RESET_CART});
    dispatch({type: RESET_ORDERS});
    dispatch({type: RESET_ORDER_CHAT});
    dispatch({type: RESET_UI});
  };
};
