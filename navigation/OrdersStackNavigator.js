import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function OrdersStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}
