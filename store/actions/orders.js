import {API_URL} from '../../utility/constants';
import {sendRequest} from '../../utility/helpers';
import {ordersUiStartLoading, ordersUiStopLoading, getAuthToken} from './';
import {SET_ORDERS} from './actionTypes';

export const setOrders = (openOrders, closedOrders) => {
  return {
    type: SET_ORDERS,
    openOrders,
    closedOrders,
  };
};

export const postOrder = ({deliveryMode}) => {
  return async (dispatch, state) => {
    try {
      dispatch(ordersUiStartLoading());

      let token = await dispatch(getAuthToken());

      const cart = state.cart;

      const orderedItem = cart.cart.map((elem) => ({
        menu_item: elem.id,
        price: elem.price,
        quantity: elem.count,
      }));

      let res = await sendRequest(
        `${API_URL}/order/orders-made/`,
        'POST',
        {
          ordereditem: orderedItem,
          //   pick_up_time: cart.checkoutInfo.delivery_time,
          delivery_address: state.user.userAddress,
          phone: state.user.user.phone,
          subtotal_fee: cart.subtotal,
          delivery_fee: Number.isInteger(cart.checkoutInfo.delivery)
            ? cart.checkoutInfo.delivery
            : 0,
          service_fee: 0,
          order_type: deliveryMode === 'delivery' ? 'DELIVERY' : 'PICK UP',
          restaurant: cart.checkoutInfo.restaurant_id,
        },
        {},
        token,
      );

      dispatch(ordersUiStopLoading());
      if (res.ok) {
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
      dispatch(ordersUiStartLoading());

      let token = await dispatch(getAuthToken());

      let res = await sendRequest(
        `${API_URL}/order/orders-made/get-orders/`,
        'GET',
        {},
        {},
        token,
      );

      if (res.ok) {
        let resJson = await res.json();
        await dispatch(setOrders(resJson.open_orders, resJson.closed_orders));
        return null;
      }

      dispatch(ordersUiStopLoading());
      return 'Failed';
    } catch (error) {
      dispatch(ordersUiStopLoading());
      console.log(error);
      return 'Something went wrong. Please check your internet connection and try again';
    }
  };
};
