import {SET_USER, SET_USER_ADDRESS} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {
  userUiStartLoading,
  userUiStopLoading,
  resetApp,
  getAuthToken,
} from './';
import RNSecureKeyStore from 'react-native-secure-key-store';
import {sendRequest, sendPictureRequest} from '../../utility/helpers';
import {
  ordersUiStartLoading,
  ordersUiStopLoading,
  uiStartLoading,
  uiStopLoading,
} from './ui';
import {setOrders} from './orders';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setUserAddress = (userAddress) => {
  return {
    type: SET_USER_ADDRESS,
    userAddress,
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

export const getUserRole = () => {
  return async (dispatch, state) => {
    try {
      let userRole = await state.auth.userRole;
      if (!userRole) {
        userRole = await RNSecureKeyStore.get('user-role');
      }
      return userRole;
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

export const updateUser = (userData) => {
  return async (dispatch, state) => {
    dispatch(userUiStartLoading());
    console.log(userData);
    try {
      let token = await dispatch(getAuthToken());
      let userId = await dispatch(getUserId());

      let res = await sendRequest(
        `${API_URL}/auth/users/${userId}/`,
        'PATCH',
        {...userData},
        {},
        token,
      );

      console.log(res);
      await dispatch(userUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        dispatch(setUser(resJson));
        return null;
      }
      return 'Failed';
    } catch (e) {
      dispatch(userUiStopLoading());
      console.warn(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};

export const verifyAccount = ({number, code}) => {
  return async (dispatch, state) => {
    dispatch(uiStartLoading());
    try {
      let res = await sendRequest(
        `https://api.paystack.co/bank/resolve?account_number=${number}&bank_code=${code}`,
        'GET',
        {},
        {},
        'sk_test_b7b83c1b97164a946a7c5bd50c3292acd56bc96d',
      );

      await dispatch(uiStopLoading());

      let resJson = await res.json();

      return resJson;
    } catch (e) {
      dispatch(uiStopLoading());
      console.warn(e);
      return {
        status: 'false',
        message: 'Something went wrong please check your internet conection',
      };
    }
  };
};

export const getAllBanks = () => {
  return async (dispatch, state) => {
    dispatch(ordersUiStartLoading());
    try {
      let res = await sendRequest(
        'https://api.paystack.co/bank',
        'GET',
        {},
        {},
        'sk_test_b7b83c1b97164a946a7c5bd50c3292acd56bc96d',
      );

      await dispatch(ordersUiStopLoading());

      let resJson = await res.json();

      if (resJson.data.length > 0) {
        return resJson.data;
      } else {
        return [];
      }
    } catch (e) {
      dispatch(ordersUiStopLoading());
      console.warn(e);
      return [];
    }
  };
};

export const changeProfilePicture = ({uri, type, fileName}) => {
  return async (dispatch, state) => {
    try {
      dispatch(userUiStartLoading());

      let token = await dispatch(getAuthToken());
      let userId = await dispatch(getUserId());

      const formData = new FormData();

      formData.append('image', {
        uri,
        type,
        name: fileName,
      });

      setTimeout(() => {
        if (!res) {
          dispatch(userUiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendPictureRequest(
        `${API_URL}/auth/users/${userId}/`,
        'PATCH',
        formData,
        {},
        token,
      );
      await dispatch(userUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        console.log('For picture', resJson);

        if (resJson.errors || resJson.detail) {
          return resJson.errors || resJson.detail;
        }
        await dispatch(setUser(resJson));
        return null;
      }

      return 'Failed';
    } catch (error) {
      dispatch(userUiStopLoading());
      return 'Please check your internet connection and try again';
    }
  };
};

export const signUpVendor = (data) => {
  return async (dispatch, state) => {
    try {
      dispatch(userUiStartLoading());

      console.log('my data...', data);

      let token = await dispatch(getAuthToken());

      setTimeout(() => {
        if (!res) {
          dispatch(userUiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/branch_restaurant/`,
        'POST',
        {...data},
        {},
        token,
      );
      await dispatch(userUiStopLoading());

      console.log('Res for vendor create...', res);

      if (res.ok) {
        let resJson = await res.json();
        console.log('For picture', resJson);

        if (resJson.errors || resJson.detail) {
          return resJson.errors || resJson.detail;
        }
        // await dispatch(setUser(resJson));

        return null;
      }

      let resText = await res.text();
      if (resText) {
        console.error('Become resText...', resText);
      }

      return 'Failed';
    } catch (error) {
      console.log(error);
      dispatch(userUiStopLoading());
      return 'Please check your internet connection and try again';
    }
  };
};

export const restaurantSignIn = (data) => {
  return async (dispatch, state) => {
    try {
      dispatch(userUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(() => {
        if (!res) {
          dispatch(userUiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/orders-made/get-branch-orders/`,
        'POST',
        {...data},
        {},
        token,
      );
      await dispatch(userUiStopLoading());

      console.log('Res for vendor create...', res);

      if (res.ok) {
        let resJson = await res.json();
        console.log('Restaurant sign in...', resJson);

        if (resJson.errors || resJson.detail) {
          return resJson.errors || resJson.detail;
        }

        await dispatch(setUser({userName: data.username}));

        await dispatch(
          setOrders(
            resJson?.all_orders?.open_orders ?? [],
            resJson?.all_orders?.closed_orders ?? [],
          ),
        );

        return null;
      }

      let resText = await res.text();
      if (resText) {
        console.error('Become resText...', resText);
      }

      return 'Failed';
    } catch (error) {
      console.log(error);
      dispatch(userUiStopLoading());
      return 'Please check your internet connection and try again';
    }
  };
};
