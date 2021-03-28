import {
  UI_START_LOADING,
  UI_STOP_LOADING,
  USER_UI_START_LOADING,
  USER_UI_STOP_LOADING,
  VENDORS_UI_START_LOADING,
  VENDORS_UI_STOP_LOADING,
  VENDORS_MENU_UI_START_LOADING,
  VENDORS_MENU_UI_STOP_LOADING,
  CART_UI_START_LOADING,
  CART_UI_STOP_LOADING,
  RESET_UI,
  ORDERS_UI_START_LOADING,
  ORDERS_UI_STOP_LOADING,
  ORDER_CHAT_UI_START_LOADING,
  ORDER_CHAT_UI_STOP_LOADING,
  PROMOS_UI_START_LOADING,
  PROMOS_UI_STOP_LOADING,
  RE_INITIATE_ORDER_UI_START_LOADING,
  RE_INITIATE_ORDER_UI_STOP_LOADING,
  CATEGORY_UI_START_LOADING,
  CATEGORY_UI_STOP_LOADING,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isUserLoading: false,
  isVendorsLoading: false,
  isVendorsMenuLoading: false,
  isCartLoading: false,
  isOrdersLoading: false,
  isOrderChartLoading: false,
  isPromoLoading: false,
  isReInitiateLoading: false,
  isCategoriesLoading: false,
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
    case CART_UI_START_LOADING:
      return {
        ...state,
        isCartLoading: true,
      };
    case CART_UI_STOP_LOADING:
      return {
        ...state,
        isCartLoading: false,
      };
    case ORDERS_UI_START_LOADING:
      return {
        ...state,
        isOrdersLoading: true,
      };
    case ORDERS_UI_STOP_LOADING:
      return {
        ...state,
        isOrdersLoading: false,
      };
    case ORDER_CHAT_UI_START_LOADING:
      return {
        ...state,
        isOrderChartLoading: true,
      };
    case ORDER_CHAT_UI_STOP_LOADING:
      return {
        ...state,
        isOrderChartLoading: false,
      };
    case PROMOS_UI_START_LOADING:
      return {
        ...state,
        isPromoLoading: true,
      };
    case PROMOS_UI_STOP_LOADING:
      return {
        ...state,
        isPromoLoading: false,
      };
    case RE_INITIATE_ORDER_UI_START_LOADING:
      return {
        ...state,
        isReInitiateLoading: true,
      };
    case RE_INITIATE_ORDER_UI_STOP_LOADING:
      return {
        ...state,
        isReInitiateLoading: false,
      };
    case CATEGORY_UI_START_LOADING:
      return {
        ...state,
        isCategoriesLoading: true,
      };
    case CATEGORY_UI_STOP_LOADING:
      return {
        ...state,
        isCategoriesLoading: false,
      };
    case RESET_UI:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
