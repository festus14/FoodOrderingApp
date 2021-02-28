import {
  RESET_ORDER_CHAT,
  SET_CHATS,
  SET_ORDER_CHAT,
} from '../actions/actionTypes';

const initialState = {
  orderChat: [],
  chats: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDER_CHAT:
      return {
        ...state,
        orderChat: action.chat,
      };
    case SET_CHATS:
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
