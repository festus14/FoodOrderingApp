import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {ordersUiStartLoading, ordersUiStopLoading, getAuthToken} from './';
import {SET_ORDERS, SET_SINGLE_ORDER} from './actionTypes';
import {
  cancelUiStartLoading,
  cancelUiStopLoading,
  reInitiateUiStartLoading,
  reInitiateUiStopLoading,
} from './ui';
import {restaurantSignIn} from './user';

export const setOrders = (openOrders, closedOrders) => {
  return {
    type: SET_ORDERS,
    openOrders,
    closedOrders,
  };
};

export const setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

export const postOrder = ({reference}) => {
  return async (dispatch, state) => {
    try {
      dispatch(ordersUiStartLoading());

      let token = await dispatch(getAuthToken());

      const cart = state.cart;

      const orderedItem = cart.cart.map((elem) => ({
        menu_item: elem.id,
        price: elem.price,
        quantity: elem.count,
        special_note: elem.instruction,
      }));

      let res = await sendRequest(
        `${API_URL}/order/orders-made/`,
        'POST',
        {
          ordereditem: orderedItem,
          pick_up_time: cart.checkoutInfo?.pickupTime ?? null,
          delivery_address: state.user.userAddress,
          phone: state.user.user.phone,
          subtotal_fee: cart?.checkoutInfo?.total || cart.subtotal,
          delivery_fee: Number.isInteger(+cart.checkoutInfo.delivery_fee)
            ? +cart.checkoutInfo.delivery_fee
            : 0,
          service_fee: Math.round(+cart.subtotal * 0.03),
          order_type: cart.checkoutInfo.deliveryMode,
          restaurant: cart.checkoutInfo.restaurant_id,
          transaction_reference: reference,
          promo_code_used: cart.checkoutInfo.promoId,
        },
        {},
        token,
      );

      dispatch(ordersUiStopLoading());
      if (res.ok) {
        let resJson = await res.json();
        await dispatch(setSingleOrder(resJson));
        await dispatch(getOrders());
        return null;
      }

      return 'Failed';
    } catch (error) {
      dispatch(ordersUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const getOrders = () => {
  return async (dispatch, state) => {
    try {
      await dispatch(ordersUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(ordersUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/orders-made/get-orders/`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(ordersUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        await dispatch(
          setOrders(
            resJson?.all_orders?.open_orders ?? [],
            resJson?.all_orders?.closed_orders ?? [],
          ),
        );
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(ordersUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const cancelOrder = (id, isRestaurant) => {
  return async (dispatch, state) => {
    try {
      await dispatch(cancelUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(cancelUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/orders-made/${id}/`,
        'PATCH',
        {status_of_order: 'CANCELLED'},
        {},
        token,
      );

      await dispatch(cancelUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        if (isRestaurant) {
          await dispatch(
            restaurantSignIn({username: state?.user?.user?.userName ?? ''}),
          );
        } else {
          await dispatch(getOrders());
        }
        return null;
      }

      let resText = await res.text();
      if (resText) {
        return resText;
      }

      return 'Failed';
    } catch (error) {
      await dispatch(cancelUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const confirmOrder = (id) => {
  return async (dispatch, state) => {
    try {
      await dispatch(cancelUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(cancelUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/orders-made/${id}/`,
        'PATCH',
        {status_of_order: 'COMPLETED'},
        {},
        token,
      );

      await dispatch(cancelUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        await dispatch(getOrders());
        return null;
      }

      let resText = await res.text();
      // if (resText) {
      //   return resText;
      // }

      return 'Failed';
    } catch (error) {
      await dispatch(cancelUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const reInitiateOrder = (reference) => {
  return async (dispatch, state) => {
    try {
      await dispatch(reInitiateUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(reInitiateUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/payment/transactions/verify-transaction/?reference=${reference}`,
        'GET',
        {},
        {},
        token,
      );

      await dispatch(reInitiateUiStopLoading());
      console.log('Re initiate order res...', res);

      if (res.ok) {
        let resJson = await res.json();
        console.log('Re initiate order resJson...', resJson);
        await dispatch(getOrders());
        return null;
      }

      let resText = await res.text();
      if (resText) {
        console.log('ResText...', resText);
      }

      return 'Failed';
    } catch (error) {
      await dispatch(reInitiateUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};

export const acceptOrder = (id, isOrderReady) => {
  return async (dispatch, state) => {
    try {
      await dispatch(reInitiateUiStartLoading());

      let token = await dispatch(getAuthToken());

      setTimeout(async () => {
        await dispatch(reInitiateUiStopLoading());
        if (!res) {
          return 'Check your internet connection and try again!';
        }
      }, 15000);

      let res = await sendRequest(
        `${API_URL}/order/orders-made/${id}/`,
        'PATCH',
        {status_of_order: `${isOrderReady ? 'ORDER_READY' : 'ACCEPTED'}`},
        {},
        token,
      );

      await dispatch(reInitiateUiStopLoading());
      console.log('accept res...', res);

      if (res.ok) {
        let resJson = await res.json();
        console.log('accept resJson...', resJson);
        await dispatch(
          restaurantSignIn({username: state?.user?.user?.userName ?? ''}),
        );
        return null;
      }

      let resText = await res.text();
      if (resText) {
        console.log('resText...', resText);
      }

      return 'Failed';
    } catch (error) {
      await dispatch(reInitiateUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
