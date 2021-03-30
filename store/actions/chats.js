import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {SET_ORDER_CHAT, SET_CHATS} from './actionTypes';
import {getAuthToken} from './auth';
import {orderChatUiStartLoading, orderChatUiStopLoading} from './ui';

export const setOrderChat = (chat) => {
  return {
    type: SET_ORDER_CHAT,
    chat,
  };
};

export const setChats = (chats) => {
  return {
    type: SET_CHATS,
    chats,
  };
};

export const getOrderChat = (id) => {
  return async (dispatch, state) => {
    try {
      await dispatch(orderChatUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(orderChatUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `https://api.boxin.ng/ws/chat/${id}/`,
        'GET',
        {},
        {},
        token,
      );

      console.log('res...', res);

      await dispatch(orderChatUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        console.log('Chat resJson', resJson);
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(orderChatUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const getChats = (id) => {
  return async (dispatch, state) => {
    try {
      await dispatch(orderChatUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(orderChatUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/chat/chats/`,
        'GET',
        {},
        {},
        token,
      );

      console.log('chats res...', res);

      await dispatch(orderChatUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        console.log('Chat resJson', resJson);
        await dispatch(setChats(resJson.results));
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(orderChatUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
