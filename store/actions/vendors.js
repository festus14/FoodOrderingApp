import {
  SET_CATEGORIES,
  SET_MENUS,
  SET_VENDORS,
  SET_VENDOR_MENUS,
} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {
  resetApp,
  getAuthToken,
  vendorsUiStartLoading,
  vendorsUiStopLoading,
  vendorsMenuUiStartLoading,
  vendorsMenuUiStopLoading,
} from './';
import {sendPictureRequest, sendRequest} from '../../utility/helpers';
import {getUserRole, setUserAddress} from './user';
import * as RootNavigation from '../../RootNavigation';
import {resetCart} from './cart';
import {categoryStartLoading, categoryUiStopLoading} from './ui';

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

export const setMenus = (menus) => {
  return {
    type: SET_MENUS,
    menus,
  };
};

export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories,
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

        await dispatch(resetCart());
        return resJson.results;
      }
    } catch (e) {
      await dispatch(vendorsMenuUiStopLoading());
      console.warn(e);
    }
  };
};

export const getMenus = () => {
  return async (dispatch, state) => {
    dispatch(vendorsMenuUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/order/menu/`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(vendorsMenuUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        await dispatch(setMenus(resJson.results));

        return null;
      }
      return 'Failed';
    } catch (e) {
      await dispatch(vendorsMenuUiStopLoading());
      console.warn(e);
      return 'Failed';
    }
  };
};

export const changeMenuPicture = ({uri, type, fileName, id}) => {
  return async (dispatch, state) => {
    try {
      dispatch(vendorsMenuUiStartLoading());
      let token = await dispatch(getAuthToken());

      const formData = new FormData();

      formData.append('food_image', {
        uri,
        type,
        name: fileName,
      });

      setTimeout(() => {
        if (!res) {
          dispatch(vendorsMenuUiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendPictureRequest(
        `${API_URL}/order/menu/${id}/`,
        'PATCH',
        formData,
        {},
        token,
      );
      await dispatch(vendorsMenuUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        console.log('For picture', resJson);

        return null;
      }

      return 'Failed';
    } catch (error) {
      dispatch(vendorsMenuUiStopLoading());
      return 'Please check your internet connection and try again';
    }
  };
};

export const addMenu = ({food_image, ...data}) => {
  return async (dispatch, state) => {
    console.log('My Data...', data);
    dispatch(vendorsMenuUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/order/menu/`,
        'POST',
        {...data},
        {},
        token,
      );

      await dispatch(vendorsMenuUiStopLoading());
      console.log('Add menu res...', res);

      if (res.ok) {
        let resJson = await res.json();
        console.log('Add menu resJson...', resJson);

        return await dispatch(
          changeMenuPicture({...food_image, id: resJson.id}),
        );
      }

      let resText = await res.text();
      if (resText) {
        console.error('ResText...', resText);
        return resText;
      }
      return 'Failed';
    } catch (e) {
      await dispatch(vendorsMenuUiStopLoading());
      console.error(e);
      return 'Failed';
    }
  };
};

export const likeVendor = (id) => {
  return async (dispatch, state) => {
    try {
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/auth/users/like-restaurant/`,
        'POST',
        {restaurant_id: id},
        {},
        token,
      );

      if (res.ok) {
        let resJson = await res.json();

        await dispatch(getVendors({delivery_address: state.user.userAddress}));

        return resJson.success ? null : 'Failed';
      }
      return 'Failed';
    } catch (error) {
      return 'Failed';
    }
  };
};

export const createVendorCategory = (data) => {
  return async (dispatch, state) => {
    try {
      await dispatch(categoryStartLoading());
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/order/category_based_menu/`,
        'POST',
        {...data},
        {},
        token,
      );

      await dispatch(categoryUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        console.log('Category create resJson...', resJson);
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(categoryUiStopLoading());
      return 'Failed';
    }
  };
};

export const getVendorCategories = () => {
  return async (dispatch, state) => {
    try {
      await dispatch(categoryStartLoading());
      let token = await dispatch(getAuthToken());
      let res = await sendRequest(
        `${API_URL}/order/category_based_menu/restaurant_categories/`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(categoryUiStopLoading());
      // console.log('Category get res...', res);

      if (res.ok) {
        let resJson = await res.json();
        await dispatch(setCategories(resJson.food_types));
        console.log('Category get resJson...', resJson);
        return null;
      }

      let resText = res.text();
      console.log('ResText...', resText);

      return 'Failed';
    } catch (error) {
      await dispatch(categoryUiStopLoading());
      return 'Failed';
    }
  };
};
