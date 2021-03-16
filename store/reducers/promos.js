import {SET_PROMO_CODES, RESET_PROMO_CODES} from '../actions/actionTypes';

const initialState = {
  promos: [],
  promoObject: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PROMO_CODES:
      return {
        ...state,
        promos: action.promos.results,
        promoObject: action.promos,
      };
    case RESET_PROMO_CODES:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
