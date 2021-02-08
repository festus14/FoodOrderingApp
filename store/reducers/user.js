import {SET_USER, RESET_USER} from '../actions/actionTypes';

const initialState = {
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
