import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantAccountScreen from '../screens/RestaurantAccountScreen';
import PromotionScreen from '../screens/PromotionScreen';
import AboutScreen from '../screens/AboutScreen';
import BecomeVendorScreen from '../screens/BecomeVendorScreen';
import DriversScreen from '../screens/DriversScreen';
import RestaurantEditAccountScreen from '../screens/RestaurantEditAccountScreen';

const Stack = createStackNavigator();

export default function RestaurantAccountStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="RestaurantAccountScreen"
        component={RestaurantAccountScreen}
      />
      <Stack.Screen
        name="RestaurantEditAccountScreen"
        component={RestaurantEditAccountScreen}
      />
      <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="BecomeVendorScreen" component={BecomeVendorScreen} />
      <Stack.Screen name="DriversScreen" component={DriversScreen} />
    </Stack.Navigator>
  );
}
