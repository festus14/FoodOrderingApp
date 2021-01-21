import React from 'react';
import {combineReducers} from '../utility/helpers';
import ui from './reducers/ui';

export const Store = React.createContext();

export const initialState = {ui: ui.initialState};

export function StoreProvider(props) {
  const [state, dispatch] = combineReducers({
    ui: React.useReducer(ui.reducer, ui.initialState),
  });

  return (
    <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
  );
}
