import React from 'react';
import {combineReducers} from '../utility/helpers';
import auth from './reducers/auth';
import ui from './reducers/ui';
import user from './reducers/user';
import vendors from './reducers/vendors';
import cart from './reducers/cart';
import orders from './reducers/orders';
import chats from './reducers/chats';
import promos from './reducers/promos';

export const Store = React.createContext();

export const initialState = {
  ui: ui.initialState,
  auth: auth.initialState,
  user: user.initialState,
  vendors: vendors.initialState,
  cart: cart.initialState,
  orders: orders.initialState,
  chats: chats.initialState,
  promos: promos.initialState,
};

export function StoreProvider(props) {
  const [state, dispatch] = combineReducers({
    ui: React.useReducer(ui.reducer, ui.initialState),
    auth: React.useReducer(auth.reducer, auth.initialState),
    user: React.useReducer(user.reducer, user.initialState),
    vendors: React.useReducer(vendors.reducer, vendors.initialState),
    cart: React.useReducer(cart.reducer, cart.initialState),
    orders: React.useReducer(orders.reducer, orders.initialState),
    chats: React.useReducer(chats.reducer, chats.initialState),
    promos: React.useReducer(promos.reducer, promos.initialState),
  });

  return (
    <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
  );
}
