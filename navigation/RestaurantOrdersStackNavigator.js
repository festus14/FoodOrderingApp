import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantOrdersScreen from '../screens/RestaurantOrdersScreen';
import RestaurantOrderDetailsScreen from '../screens/RestaurantOrderDetailsScreen';

const Stack = createStackNavigator();

export default function RestaurantOrdersStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="RestaurantOrdersScreen"
        component={RestaurantOrdersScreen}
      />
      <Stack.Screen
        name="RestaurantOrderDetailsScreen"
        component={RestaurantOrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}
