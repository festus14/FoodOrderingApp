import {SET_VENDORS} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {
  resetApp,
  getAuthToken,
  vendorsUiStartLoading,
  vendorsUiStopLoading,
} from './';
import {sendRequest} from '../../utility/helpers';

export const setVendors = (vendors) => {
  return {
    type: SET_VENDORS,
    vendors,
  };
};

export const getVendors = (locationData) => {
  return async (dispatch, state) => {
    dispatch(vendorsUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());

      let res = await sendRequest(
        `${API_URL}/order/restaurant_near_me/`,
        'POST',
        {...locationData},
        {},
        token,
      );

      console.log('get vendors res...', res);

      let resJson = await res.json();

      console.warn('Get Vendors...', resJson);

      await dispatch(vendorsUiStopLoading());

      if (resJson.error) {
        if (resJson.error === 'Unauthenticated.') {
          dispatch(resetApp());
        }
        return 'Something went wrong, pls try again';
      }
      dispatch(setVendors(resJson.data));
      return null;
    } catch (e) {
      dispatch(vendorsUiStopLoading());
      console.warn(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};
