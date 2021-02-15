import {
  SET_VENDORS,
  SET_VENDOR_MENUS,
  RESET_VENDORS,
} from '../actions/actionTypes';

const initialState = {
  vendors: [],
  vendorMenus: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VENDORS:
      return {
        ...state,
        vendors: action.vendors,
      };
    case SET_VENDOR_MENUS:
      return {
        ...state,
        vendorMenus: action.vendorMenus,
      };
    case RESET_VENDORS:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
