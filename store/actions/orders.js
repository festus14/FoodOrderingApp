import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {ordersUiStartLoading, ordersUiStopLoading, getAuthToken} from './';
import {SET_ORDERS, SET_SINGLE_ORDER} from './actionTypes';
import {reInitiateUiStartLoading, reInitiateUiStopLoading} from './ui';

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
          pick_up_time: cart.checkoutInfo.pickupTime,
          delivery_address: state.user.userAddress,
          phone: state.user.user.phone,
          subtotal_fee: cart?.checkoutInfo?.total || cart.subtotal,
          delivery_fee: Number.isInteger(cart.checkoutInfo.delivery)
            ? cart.checkoutInfo.delivery
            : 0,
          service_fee: Math.round(+cart.subtotal * 0.03),
          order_type:
            cart.checkoutInfo.deliveryMode === 'delivery'
              ? 'DELIVERY'
              : 'PICK UP',
          restaurant: cart.checkoutInfo.restaurant_id,
          transaction_reference: reference,
          promo_code_used: cart.checkoutInfo.promoId,
        },
        {},
        token,
      );

      console.log(
        'cart.checkoutInfo.deliveryMode...',
        cart.checkoutInfo.deliveryMode,
      );

      console.log('Order res...', {
        ordereditem: orderedItem,
        pick_up_time: cart.checkoutInfo.pickupTime,
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
      });

      dispatch(ordersUiStopLoading());
      if (res.ok) {
        let resJson = await res.json();
        console.log('Order made, resJson', resJson);
        dispatch(setSingleOrder(resJson));
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

export const cancelOrder = (id) => {
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
        `${API_URL}/order/orders-made/${id}/`,
        'PATCH',
        {status_of_order: 'CANCELLED'},
        {},
        token,
      );

      await dispatch(ordersUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();
        await dispatch(getOrders());
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

      console.log('ResJson re-initiate...', res);
      let resJson = await res.json();
      console.log('ResJson re-initiate...', resJson, reference);

      if (res.ok) {
        // let resJson = await res.json();
        // console.log('ResJson re-initiate...', resJson);
        await dispatch(getOrders());
        return null;
      }
      return 'Failed';
    } catch (error) {
      await dispatch(reInitiateUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
