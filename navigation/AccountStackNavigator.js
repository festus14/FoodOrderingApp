import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

export default function AccountStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} />
    </Stack.Navigator>
  );
}
