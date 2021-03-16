import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {promosUiStartLoading, promosUiStopLoading, getAuthToken} from './';
import {SET_PROMO_CODES} from './actionTypes';

export const setPromoCodes = (promos) => {
  return {
    type: SET_PROMO_CODES,
    promos,
  };
};

export const getPromoCodes = () => {
  return async (dispatch, state) => {
    try {
      await dispatch(promosUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(promosUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/promo-code/`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(promosUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        // console.log('Promo codes resJson', resJson);
        await dispatch(setPromoCodes(resJson));
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(promosUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
