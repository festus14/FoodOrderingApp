import {RESET_ORDER_CHAT, SET_ORDER_CHAT} from '../actions/actionTypes';

const initialState = {
  chat: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDER_CHAT:
      return {
        ...state,
        chats: action.chat,
      };
    case RESET_ORDER_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default {initialState, reducer};
