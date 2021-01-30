import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import PromotionScreen from '../screens/PromotionScreen';
import AboutScreen from '../screens/AboutScreen';
import BecomeVendorScreen from '../screens/BecomeVendorScreen';
import DriversScreen from '../screens/DriversScreen';

const Stack = createStackNavigator();

export default function AccountStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="BecomeVendorScreen" component={BecomeVendorScreen} />
      <Stack.Screen name="DriversScreen" component={DriversScreen} />
    </Stack.Navigator>
  );
}
