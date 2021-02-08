import {SET_VENDORS, RESET_VENDORS} from '../actions/actionTypes';

const initialState = {
  vendors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VENDORS:
      return {
        ...state,
        vendors: action.vendors,
      };
    case RESET_VENDORS:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
