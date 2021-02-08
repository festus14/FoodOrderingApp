import {
  UI_START_LOADING,
  UI_STOP_LOADING,
  USER_UI_START_LOADING,
  USER_UI_STOP_LOADING,
  VENDORS_UI_START_LOADING,
  VENDORS_UI_STOP_LOADING,
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
