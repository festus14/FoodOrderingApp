import {SET_BRANCHES} from '../actions/actionTypes';

const initialState = {
  branches: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_BRANCHES:
      return {
        ...state,
        branches: action.branches,
      };

    default:
      return state;
  }
};

export default {initialState, reducer};
