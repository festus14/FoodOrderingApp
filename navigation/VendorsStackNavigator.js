import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VendorsScreen from '../screens/VendorsScreen';
import SingleVendorScreen from '../screens/SingleVendorScreen';
import SingleFoodScreen from '../screens/SingleFoodScreen';

const Stack = createStackNavigator();

export default function VendorsStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="VendorsScreen" component={VendorsScreen} />
      <Stack.Screen name="SingleVendorScreen" component={SingleVendorScreen} />
      <Stack.Screen name="SingleFoodScreen" component={SingleFoodScreen} />
    </Stack.Navigator>
  );
}
