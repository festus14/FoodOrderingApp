import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainAppStackNavigator from './MainAppStackNavigator';
import ModalScreen from '../screens/ModalScreen';

const RootStack = createStackNavigator();

export default function RootAppNavigator() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="MainAppStackNavigator"
        component={MainAppStackNavigator}
      />
      <RootStack.Screen
        name="MyModal"
        component={ModalScreen}
        header={{mode: 'screen'}}
      />
    </RootStack.Navigator>
  );
}
