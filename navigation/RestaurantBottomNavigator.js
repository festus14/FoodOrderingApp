import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RestaurantOrdersStackNavigator from './RestaurantOrdersStackNavigator';
import {MAIN_COLOR} from '../utility/colors';
import OrdersStackNavigator from './OrdersStackNavigator';
import AccountStackNavigator from './AccountStackNavigator';

const Tab = createBottomTabNavigator();

export default function RestaurantBottomNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: MAIN_COLOR,
        activeBackgroundColor: '#fff',
        inactiveTintColor: '#fff',
        inactiveBackgroundColor: MAIN_COLOR,
        keyboardHidesTabBar: true,
        tabStyle: {justifyContent: 'center', alignItems: 'center'},
        labelStyle: {fontSize: 20},
      }}>
      <Tab.Screen
        name="RestaurantOrdersStackNavigator"
        component={RestaurantOrdersStackNavigator}
        options={{title: 'Orders'}}
      />
      <Tab.Screen
        name="OrdersStackNavigator"
        component={OrdersStackNavigator}
        options={{title: 'Chats'}}
      />
      <Tab.Screen
        name="AccountStackNavigator"
        component={AccountStackNavigator}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
}
