import {SET_USER, SET_USER_ADDRESS, RESET_USER} from '../actions/actionTypes';

const initialState = {
  user: {},
  userAddress: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {...state.user, ...action.user},
      };
    case SET_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.userAddress,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
