import React, {useEffect, useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, View, Alert} from 'react-native';
import LandingScreen from '../screens/LandingScreen';
import ConsumerMapScreen from '../screens/ConsumerMapScreen';
import AuthStackNavigator from './AuthStackNavigator';
import ConsumerBottomNavigator from './ConsumerBottomNavigator';
import RestaurantBottomNavigator from './RestaurantBottomNavigator';
import {Store} from '../store';
import {getUser} from '../store/actions/user';
import CheckoutModal from '../screens/CheckoutModal';

const MainStack = createStackNavigator();

export default function MainAppNavigator() {
  const {
    state: {
      ui: {isLoading},
      auth: {token, userRole},
    },
    dispatch,
  } = useContext(Store);

  // console.warn(userRole);

  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="LandingScreen" component={LandingScreen} />
      {token === null ? (
        <MainStack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
        />
      ) : (
        <>
          <MainStack.Screen
            name="ConsumerMapScreen"
            component={ConsumerMapScreen}
          />
          {userRole === 'CONSUMER' ? (
            <>
              <MainStack.Screen
                name="ConsumerBottomNavigator"
                component={ConsumerBottomNavigator}
              />
              <MainStack.Screen
                name="CheckoutModal"
                component={CheckoutModal}
                header={{mode: 'screen'}}
              />
            </>
          ) : (
            <MainStack.Screen
              name="RestaurantBottomNavigator"
              component={RestaurantBottomNavigator}
            />
          )}
        </>
      )}
    </MainStack.Navigator>
  );
}
