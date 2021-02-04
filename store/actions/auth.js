import {AUTH_SET_TOKEN} from './actionTypes';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {uiStartLoading, uiStopLoading, setUser, resetApp} from './';
import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import moment from 'moment';

export const authSetToken = (token, userId, expiry) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
    userId,
    expiry,
  };
};

export const authStoreAsyncData = (token, userId, userData, expiry) => {
  return async (dispatch) => {
    dispatch(authSetToken(token, userId, expiry));
    try {
      await RNSecureKeyStore.set('userId', JSON.stringify(userId), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('auth-token', token, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('user-data', JSON.stringify(userData), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('auth-expiry-date', expiry, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.warn(error);
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
      await RNSecureKeyStore.set('user-data', JSON.stringify(''), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
      await RNSecureKeyStore.set('auth-expiry-date', '', {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const logIn = (authData) => {
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
        `${API_URL}/auth/login/`,
        'POST',
        {
          email: authData.email,
          password: authData.password,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();

      console.warn('Log in...', resJson);

      dispatch(uiStopLoading());
      if (resJson.error || resJson.error === 'Unauthenticated.') {
        return resJson.error === 'Login Failed, kindly login again'
          ? 'Email and password do not match'
          : 'Authentication failed, please try again';
      } else {
        let {user, email, name, roles, mobile} = resJson.data;
        user = {
          ...user,
          email,
          name,
          roles,
          mobile,
        };
        dispatch(
          authStoreAsyncData(
            resJson.data.token,
            user.id,
            authData,
            resJson.data.expiry_date.date,
          ),
        );
        dispatch(setUser(user));
      }
    } catch (error) {
      dispatch(uiStopLoading());
      console.log('Sign in catch...', error);
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
          token: authData.token,
          password: authData.password,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();

      console.warn('Reset password...', resJson);

      dispatch(uiStopLoading());

      if (!res.ok) {
        if (res.status === 401) {
          return 'Please log out and sign in again';
        }
        return (
          resJson?.email[0] ??
          resJson?.message ??
          'Something went wrong, try again'
        );
      }

      return null;
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
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
          lastname: authData.lastName,
          phone: authData.phoneNumber,
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
        `${API_URL}/auth/login/`,
        'POST',
        {
          // email: authData.email,
          // password: authData.password,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();
      console.warn('Log in...', resJson);

      dispatch(uiStopLoading());
      if (resJson.error || resJson.error === 'Unauthenticated.') {
        return resJson.error === 'Login Failed, kindly login again'
          ? 'Email and password do not match'
          : 'Authentication failed, please try again';
      } else {
        let {user, email, name, roles, mobile} = resJson.data;
        user = {
          ...user,
          email,
          name,
          roles,
          mobile,
        };
        dispatch(
          authStoreAsyncData(
            resJson.data.token,
            user.id,
            // authData,
            resJson.data.expiry_date.date,
          ),
        );
        dispatch(setUser(user));
      }
    } catch (error) {
      dispatch(uiStopLoading());
      console.log('Sign in catch...', error);
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

      let res = await sendRequest(
        `${API_URL}/auth/users/resend-token/`,
        'POST',
        {
          email,
        },
        {Authorization: ''},
      );

      let resJson = await res.json();
      console.warn('Verify User Token...', resJson);

      await dispatch(uiStopLoading());
      if (resJson.error) {
        return resJson.error || 'Authentication failed, please try again';
      }
      return null;
    } catch (error) {
      dispatch(uiStopLoading());
      console.log(error);
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

      let resJson = await res.json();
      console.warn('Forgot password...', resJson);

      await dispatch(uiStopLoading());
      if (resJson.error) {
        return resJson.error || 'Authentication failed, please try again';
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
    if (!token || moment(expiryDate).add(59, 'minutes') <= moment()) {
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
      console.warn(resJson);

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
