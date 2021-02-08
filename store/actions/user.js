import {SET_USER} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {
  userUiStartLoading,
  userUiStopLoading,
  resetApp,
  getAuthToken,
} from './';
import RNSecureKeyStore from 'react-native-secure-key-store';
import {sendRequest} from '../../utility/helpers';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const getUserId = () => {
  return async (dispatch, state) => {
    try {
      let userId = await state.auth.userId;
      if (!userId) {
        userId = await RNSecureKeyStore.get('userId');
      }
      return userId;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };
};

export const getUser = () => {
  return async (dispatch, state) => {
    dispatch(userUiStartLoading());
    try {
      let userData = await state.user.user;

      if (!userData.email) {
        let token = await dispatch(getAuthToken());
        let userId = await dispatch(getUserId());

        let res = await sendRequest(
          `${API_URL}/auth​/users​​/${userId}/`,
          'GET',
          {},
          {},
          token,
        );
        let resJson = await res.json();

        console.warn('In get User...', resJson);

        await dispatch(userUiStopLoading());
        if (resJson.error) {
          if (resJson.error === 'Unauthenticated.') {
            dispatch(resetApp());
          }
          return 'Something went wrong, pls try again';
        } else {
          dispatch(setUser(resJson.data));
          return null;
        }
      } else {
        await dispatch(userUiStopLoading());
        return null;
      }
    } catch (e) {
      dispatch(userUiStopLoading());
      console.warn(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};
