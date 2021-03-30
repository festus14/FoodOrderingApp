import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantBottomNavigator from './RestaurantBottomNavigator';
import RestaurantSignInScreen from '../screens/RestaurantSignInScreen';

const Stack = createStackNavigator();

export default function RestaurantStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="RestaurantSignInScreen"
        component={RestaurantSignInScreen}
      />
      <Stack.Screen
        name="RestaurantBottomNavigator"
        component={RestaurantBottomNavigator}
      />
    </Stack.Navigator>
  );
}
