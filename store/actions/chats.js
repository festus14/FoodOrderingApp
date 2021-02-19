import {SET_ORDER_CHAT} from './actionTypes';

export const setOrderChat = (chat) => {
  return {
    type: SET_ORDER_CHAT,
    chat,
  };
};
