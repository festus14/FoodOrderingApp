import {
  UI_START_LOADING,
  UI_STOP_LOADING,
  USER_UI_START_LOADING,
  USER_UI_STOP_LOADING,
  VENDORS_UI_START_LOADING,
  VENDORS_UI_STOP_LOADING,
  VENDORS_MENU_UI_START_LOADING,
  VENDORS_MENU_UI_STOP_LOADING,
  RESET_UI,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isUserLoading: false,
  isVendorsLoading: false,
  isVendorsMenuLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case USER_UI_START_LOADING:
      return {
        ...state,
        isUserLoading: true,
      };
    case USER_UI_STOP_LOADING:
      return {
        ...state,
        isUserLoading: false,
      };
    case VENDORS_UI_START_LOADING:
      return {
        ...state,
        isVendorsLoading: true,
      };
    case VENDORS_UI_STOP_LOADING:
      return {
        ...state,
        isVendorsLoading: false,
      };
    case VENDORS_MENU_UI_START_LOADING:
      return {
        ...state,
        isVendorsMenuLoading: true,
      };
    case VENDORS_MENU_UI_STOP_LOADING:
      return {
        ...state,
        isVendorsMenuLoading: false,
      };
    case RESET_UI:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
