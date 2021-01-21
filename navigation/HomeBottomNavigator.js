import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VendorsStackNavigator from './VendorsStackNavigator';
import {MAIN_COLOR} from '../utility/colors';

const Tab = createBottomTabNavigator();

export default function HomeBottomNavigator() {
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
        name="VendorsStackNavigator"
        component={VendorsStackNavigator}
        options={{title: 'Vendors'}}
      />
      <Tab.Screen
        name="OrdersStackNavigator"
        component={VendorsStackNavigator}
        options={{title: 'Orders'}}
      />
      <Tab.Screen
        name="AccountStackNavigator"
        component={VendorsStackNavigator}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
}
