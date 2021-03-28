import {
  SET_VENDORS,
  SET_VENDOR_MENUS,
  RESET_VENDORS,
  SET_MENUS,
  SET_CATEGORIES,
} from '../actions/actionTypes';

const initialState = {
  vendors: [],
  vendorMenus: [],
  menus: [],
  categories: [],
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
    case SET_MENUS:
      return {
        ...state,
        menus: action.menus,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case RESET_VENDORS:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
