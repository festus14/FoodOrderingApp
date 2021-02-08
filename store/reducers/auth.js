import {AUTH_SET_TOKEN, RESET_AUTH} from '../actions/actionTypes';

const initialState = {
  token: null,
  refresh: null,
  userId: null,
  expiry: null,
  userRole: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        refresh: action.refresh,
        userId: action.userId,
        expiry: action.expiry,
        userRole: action.userRole,
      };
    case RESET_AUTH:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
