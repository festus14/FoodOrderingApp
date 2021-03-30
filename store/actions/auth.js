import {AUTH_SET_TOKEN} from './actionTypes';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {uiStartLoading, uiStopLoading, setUser, resetApp} from './';
import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import moment from 'moment';
import * as RootNavigation from '../../RootNavigation';
import jwt_decode from 'jwt-decode';

export const authSetToken = ({token, refresh, userId, expiry, userRole}) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
    refresh,
    userId,
    expiry,
    userRole,
  };
};

export const authStoreAsyncData = ({
  token,
  refresh,
  userId,
  userData,
  expiry,
  userRole,
}) => {
  return async (dispatch) => {
    dispatch(authSetToken({token, refresh, userId, expiry, userRole}));
    try {
      userId &&
        (await RNSecureKeyStore.set('user-id', JSON.stringify(userId), {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
      userRole &&
        (await RNSecureKeyStore.set('user-role', JSON.stringify(userRole), {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
      token &&
        (await RNSecureKeyStore.set('auth-token', token, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
      refresh &&
        (await RNSecureKeyStore.set('refresh-token', refresh, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
      userData &&
        (await RNSecureKeyStore.set('user-data', JSON.stringify(userData), {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
      expiry &&
        (await RNSecureKeyStore.set('auth-expiry-date', expiry, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const authRemoveAsyncData = () => {
  return async () => {
    try {
      await RNSecureKeyStore.set('userId', JSON.stringify(''), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('auth-token', '', {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('refresh-token', '', {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('user-data', JSON.stringify(''), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('user-role', JSON.stringify(''), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('auth-expiry-date', '', {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logIn = (authData) => {
  return async (dispatch, state) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authRemoveAsyncData());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/auth/login/`,
        'POST',
        {
          email: authData.email,
          password: authData.password,
        },
        {Authorization: ''},
      );

      dispatch(uiStopLoading());

      let resJson = await res.json();

      if (resJson.errors || resJson.detail) {
        return resJson.errors ?? resJson.detail ?? 'Login failed';
      }

      var userData = jwt_decode(resJson.access);

      let {access: token, refresh} = resJson;

      await dispatch(
        authStoreAsyncData({
          token,
          refresh,
          userData: authData,
          userId: userData.user_id,
          userRole: userData.roles[0],
        }),
      );

      await dispatch(setUser(userData));

      console.log('User data...', userData);

      let userRole = userData.roles[0];
      if (userRole === 'CONSUMER') {
        RootNavigation.navigate('ConsumerMapScreen');
      } else if (userRole === 'RESTAURANT') {
        RootNavigation.navigate('RestaurantStackNavigator');
      }

      return null;
    } catch (error) {
      console.log('In error', error);
      dispatch(uiStopLoading());
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const resetPassword = (authData) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authRemoveAsyncData());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/auth/users/create-password/`,
        'POST',
        {
          ...authData,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();

      dispatch(uiStopLoading());

      console.log('Reset password...', resJson);

      return resJson.errors ?? null;
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const changePassword = (authData) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());
      let token = await dispatch(getAuthToken());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      console.log(authData);

      let res = await sendRequest(
        `${API_URL}/auth/users/change-password/`,
        'POST',
        {
          ...authData,
        },
        {},
        token,
      );
      dispatch(uiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        return resJson.errors || null;
      }

      return 'Failed';
    } catch (error) {
      dispatch(uiStopLoading());
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const signUp = (authData) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authRemoveAsyncData());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/auth/users/`,
        'POST',
        {
          email: authData.email,
          password: authData.password,
          firstname: authData.firstName,
          lastname: authData?.lastName ?? '',
          phone: authData.phoneNumber,
          address: authData?.address ?? '',
          roles: authData.roles ? [authData.roles] : ['CONSUMER'],
        },
        {Authorization: ''},
      );

      let resJson = await res.json();

      console.log('Sign up...', resJson);

      await dispatch(uiStopLoading());

      if (!res.ok) {
        if (res.status === 401) {
          return 'Please log out and sign in again';
        }
        return resJson?.email[0] ?? 'Something went wrong, try again';
      }

      return null;
    } catch (error) {
      dispatch(uiStopLoading());
      return 'Something went wrong please check your internet connection and try again';
    }
  };
};

export const verifyUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/auth/users/verify-token/`,
        'POST',
        {
          token,
        },
        {Authorization: ''},
      );

      dispatch(uiStopLoading());

      let resJson = await res.json();

      return resJson?.valid ?? null;
    } catch (error) {
      dispatch(uiStopLoading());
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const resendVerifyToken = (email) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authRemoveAsyncData());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      await dispatch(uiStopLoading());

      let res = await sendRequest(
        `${API_URL}/auth/users/resend-token/`,
        'POST',
        {
          email,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();
      console.log('Verify User Token...', resJson);

      if (resJson?.errors) {
        return resJson?.errors;
      }

      return null;
    } catch (error) {
      dispatch(uiStopLoading());
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authRemoveAsyncData());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/auth/users/reset-password/`,
        'POST',
        {
          email,
        },
        {Authorization: ''},
      );

      await dispatch(uiStopLoading());
      if (res.ok) {
        let resJson = await res.json();
        console.log('Forgot password...', resJson);
      }

      return null;
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
      return 'Authentication failed, please check your internet connection and try again';
    }
  };
};

export const getAuthToken = () => {
  return async (dispatch, state) => {
    let token = state.auth.token;

    let expiryDate = state.auth.expiry;
    // if (!token || moment(expiryDate).add(59, 'minutes') <= moment()) {
    if (!token) {
      try {
        token = await RNSecureKeyStore.get('auth-token');
        expiryDate = await RNSecureKeyStore.get('auth-expiry-date');
        let userId = await RNSecureKeyStore.get('userId');
        userId = JSON.parse(userId);
        let userData = await RNSecureKeyStore.get('user-data');
        userData = JSON.parse(userData);

        if (!token || !userData) {
          return false;
        }

        if (moment(expiryDate).add(59, 'minutes') <= moment()) {
          await dispatch(logIn(userData, true));
          return state.auth.token;
        } else {
          dispatch(authSetToken(token, userId));
          return token;
        }
      } catch (error) {
        await dispatch(resetApp());
        console.log(error);
        return '';
      }
    } else {
      return token;
    }
  };
};

export const logout = () => {
  return async (dispatch, state) => {
    try {
      dispatch(uiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(() => {
        if (!res) {
          dispatch(uiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}api_logout`,
        'POST',
        {},
        {},
        token,
      );

      let resJson = await res.json();

      dispatch(uiStopLoading());
      if (resJson.error || resJson.message === 'Unauthenticated.') {
        return 'Logout failed, please try again';
      } else {
        dispatch(resetApp());
        return '';
      }
    } catch (error) {
      dispatch(uiStopLoading());
      return 'Logout failed, please try check your internet connection and try again';
    }
  };
};
