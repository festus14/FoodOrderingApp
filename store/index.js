import React from 'react';
import {combineReducers} from '../utility/helpers';
import auth from './reducers/auth';
import ui from './reducers/ui';
import user from './reducers/user';
import vendors from './reducers/vendors';
import cart from './reducers/cart';
import orders from './reducers/orders';

export const Store = React.createContext();

export const initialState = {
  ui: ui.initialState,
  auth: auth.initialState,
  user: user.initialState,
  vendors: vendors.initialState,
  cart: cart.initialState,
  orders: orders.initialState,
};

export function StoreProvider(props) {
  const [state, dispatch] = combineReducers({
    ui: React.useReducer(ui.reducer, ui.initialState),
    auth: React.useReducer(auth.reducer, auth.initialState),
    user: React.useReducer(user.reducer, user.initialState),
    vendors: React.useReducer(vendors.reducer, vendors.initialState),
    cart: React.useReducer(cart.reducer, cart.initialState),
    orders: React.useReducer(orders.reducer, orders.initialState),
  });

  return (
    <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
  );
}
