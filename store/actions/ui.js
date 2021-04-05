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
  BRANCH_UI_START_LOADING,
  BRANCH_UI_STOP_LOADING,
  CANCEL_UI_START_LOADING,
  CANCEL_UI_STOP_LOADING,
} from './actionTypes';

export const uiStartLoading = () => {
  return {
    type: UI_START_LOADING,
  };
};

export const uiStopLoading = () => {
  return {
    type: UI_STOP_LOADING,
  };
};

export const userUiStartLoading = () => {
  return {
    type: USER_UI_START_LOADING,
  };
};

export const userUiStopLoading = () => {
  return {
    type: USER_UI_STOP_LOADING,
  };
};

export const vendorsUiStartLoading = () => {
  return {
    type: VENDORS_UI_START_LOADING,
  };
};

export const vendorsUiStopLoading = () => {
  return {
    type: VENDORS_UI_STOP_LOADING,
  };
};

export const vendorsMenuUiStartLoading = () => {
  return {
    type: VENDORS_MENU_UI_START_LOADING,
  };
};

export const vendorsMenuUiStopLoading = () => {
  return {
    type: VENDORS_MENU_UI_STOP_LOADING,
  };
};

export const cartUiStartLoading = () => {
  return {
    type: CART_UI_START_LOADING,
  };
};

export const cartUiStopLoading = () => {
  return {
    type: CART_UI_STOP_LOADING,
  };
};

export const ordersUiStartLoading = () => {
  return {
    type: ORDERS_UI_START_LOADING,
  };
};

export const ordersUiStopLoading = () => {
  return {
    type: ORDERS_UI_STOP_LOADING,
  };
};

export const orderChatUiStartLoading = () => {
  return {
    type: ORDER_CHAT_UI_START_LOADING,
  };
};

export const orderChatUiStopLoading = () => {
  return {
    type: ORDER_CHAT_UI_STOP_LOADING,
  };
};

export const promosUiStartLoading = () => {
  return {
    type: PROMOS_UI_START_LOADING,
  };
};

export const promosUiStopLoading = () => {
  return {
    type: PROMOS_UI_STOP_LOADING,
  };
};

export const reInitiateUiStartLoading = () => {
  return {
    type: RE_INITIATE_ORDER_UI_START_LOADING,
  };
};

export const reInitiateUiStopLoading = () => {
  return {
    type: RE_INITIATE_ORDER_UI_STOP_LOADING,
  };
};

export const categoryStartLoading = () => {
  return {
    type: CATEGORY_UI_START_LOADING,
  };
};

export const categoryUiStopLoading = () => {
  return {
    type: CATEGORY_UI_STOP_LOADING,
  };
};

export const branchUiStartLoading = () => {
  return {
    type: BRANCH_UI_START_LOADING,
  };
};

export const branchUiStopLoading = () => {
  return {
    type: BRANCH_UI_STOP_LOADING,
  };
};

export const cancelUiStartLoading = () => {
  return {
    type: CANCEL_UI_START_LOADING,
  };
};

export const cancelUiStopLoading = () => {
  return {
    type: CANCEL_UI_STOP_LOADING,
  };
};
