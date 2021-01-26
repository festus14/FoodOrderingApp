import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VendorsStackNavigator from './VendorsStackNavigator';
import {MAIN_COLOR} from '../utility/colors';
import SingleVendorScreen from '../screens/SingleVendorScreen';
import VendorContinentalScreen from '../screens/VendorContinentalScreen';
import VendorTraditionalScreen from '../screens/VendorTraditionalScreen';

const Tab = createMaterialTopTabNavigator();

export default function VendorTopNavigator() {
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
        name="VendorContinentalScreen"
        component={VendorContinentalScreen}
        options={{title: 'Vendors'}}
      />
      <Tab.Screen
        name="VendorTraditionalScreen"
        component={VendorTraditionalScreen}
        options={{title: 'Orders'}}
      />
    </Tab.Navigator>
  );
}
