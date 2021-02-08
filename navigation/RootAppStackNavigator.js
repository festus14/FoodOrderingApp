import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainAppStackNavigator from './MainAppStackNavigator';

const RootStack = createStackNavigator();

export default function RootAppNavigator() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="MainAppStackNavigator"
        component={MainAppStackNavigator}
      />
    </RootStack.Navigator>
  );
}
