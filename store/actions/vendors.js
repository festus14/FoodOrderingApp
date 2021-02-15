import {SET_VENDORS, SET_VENDOR_MENUS} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {
  resetApp,
  getAuthToken,
  vendorsUiStartLoading,
  vendorsUiStopLoading,
  vendorsMenuUiStartLoading,
  vendorsMenuUiStopLoading,
} from './';
import {sendRequest} from '../../utility/helpers';
import {getUserRole, setUserAddress} from './user';
import * as RootNavigation from '../../RootNavigation';

export const setVendors = (vendors) => {
  return {
    type: SET_VENDORS,
    vendors,
  };
};

export const setVendorMenus = (vendorMenus) => {
  return {
    type: SET_VENDOR_MENUS,
    vendorMenus,
  };
};

export const getVendors = (locationData) => {
  return async (dispatch, state) => {
    dispatch(vendorsUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());

      let res = await sendRequest(
        `${API_URL}/order/restaurant-near-me/`,
        'POST',
        {...locationData},
        {},
        token,
      );

      await dispatch(vendorsUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        if (resJson.errors) {
          if (resJson.errors === 'Unauthenticated.') {
            dispatch(resetApp());
          }
          return resJson.errors;
        }
        await dispatch(setVendors(resJson.results));
        await dispatch(setUserAddress(locationData.delivery_address));

        let userRole = await dispatch(getUserRole());

        if (userRole === 'CONSUMER') {
          RootNavigation.navigate('ConsumerBottomNavigator');
        } else if (userRole === 'RESTAURANT') {
          RootNavigation.navigate('RestaurantBottomNavigator');
        }

        return null;
      }
      return 'Failed';
    } catch (e) {
      dispatch(vendorsUiStopLoading());
      console.warn(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};

export const getVendorMenus = (id) => {
  return async (dispatch, state) => {
    dispatch(vendorsMenuUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/order/category_based_menu/?search=${id}`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(vendorsMenuUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        if (resJson.errors) {
          if (resJson.errors === 'Unauthenticated.') {
            dispatch(resetApp());
          }
        }

        return resJson.results;
      }
    } catch (e) {
      await dispatch(vendorsMenuUiStopLoading());
      console.warn(e);
    }
  };
};
