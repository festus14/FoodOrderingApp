import {RESET_ORDER_CHAT, SET_ORDER_CHAT} from '../actions/actionTypes';

const initialState = {
  chats: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDER_CHAT:
      return {
        ...state,
        chats: action.chats,
      };
    case RESET_ORDER_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
