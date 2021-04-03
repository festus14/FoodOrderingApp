import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {SET_BRANCHES} from './actionTypes';
import {getAuthToken} from './auth';
import {branchUiStopLoading, branchUiStartLoading} from './ui';

export const setBranches = (branches) => {
  return {
    type: SET_BRANCHES,
    branches,
  };
};

export const getBranches = () => {
  return async (dispatch, state) => {
    try {
      await dispatch(branchUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(branchUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/branch_restaurant/`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(branchUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        await dispatch(setBranches(resJson.results));
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(branchUiStopLoading());
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const deleteBranch = (id) => {
  return async (dispatch, state) => {
    try {
      await dispatch(branchUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(branchUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/branch_restaurant/${id}/`,
        'DELETE',
        {},
        {},
        token,
      );

      await dispatch(branchUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        await dispatch(setBranches(resJson.results));
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(branchUiStopLoading());
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
