import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {SET_ORDER_CHAT, SET_CHATS} from './actionTypes';
import {getAuthToken} from './auth';
import {orderChatUiStartLoading, orderChatUiStopLoading} from './ui';
import {getUserRole} from './user';

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

      await dispatch(orderChatUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
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

      let url = `${API_URL}/chat/chats/`;
      let method = 'GET';
      const data = {};
      const userRole = await dispatch(getUserRole());

      if (userRole !== 'CONSUMER') {
        url = `${API_URL}/chat/chats/get-branch-chats/`;
        method = 'POST';
        data.username = state.user.user.userName;
      }

      let res = await sendRequest(url, method, {...data}, {}, token);

      await dispatch(orderChatUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        await dispatch(setChats(resJson.chats));
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
