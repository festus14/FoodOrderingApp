import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VendorsScreen from '../screens/VendorsScreen';

const Stack = createStackNavigator();

export default function VendorsStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="VendorsScreen" component={VendorsScreen} />
    </Stack.Navigator>
  );
}
