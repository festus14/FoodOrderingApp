import {RESET_AUTH, RESET_USER, RESET_VENDORS} from './actionTypes';

export const resetApp = () => {
  return async (dispatch) => {
    dispatch({type: RESET_AUTH});
    dispatch({type: RESET_VENDORS});
    dispatch({type: RESET_USER});
  };
};
