import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import ConsumerMapScreen from '../screens/ConsumerMapScreen';
import AuthStackNavigator from './AuthStackNavigator';
import ConsumerBottomNavigator from './ConsumerBottomNavigator';
import RestaurantBottomNavigator from './RestaurantBottomNavigator';
import {Store} from '../store';
import CheckoutModal from '../screens/CheckoutModal';
import SingleChatScreen from '../screens/SingleChatScreen';
import ChatsScreen from '../screens/ChatsScreen';

const MainStack = createStackNavigator();

export default function MainAppNavigator() {
  const {
    state: {
      ui: {isLoading},
      auth: {token, userRole},
    },
    dispatch,
  } = useContext(Store);

  return (
    <MainStack.Navigator headerMode="none">
      {token === null ? (
        <>
          <MainStack.Screen name="LandingScreen" component={LandingScreen} />
          <MainStack.Screen
            name="AuthStackNavigator"
            component={AuthStackNavigator}
          />
        </>
      ) : userRole === 'CONSUMER' ? (
        <>
          <MainStack.Screen
            name="ConsumerMapScreen"
            component={ConsumerMapScreen}
          />
          <MainStack.Screen
            name="ConsumerBottomNavigator"
            component={ConsumerBottomNavigator}
          />
          <MainStack.Screen
            name="SingleChatScreen"
            component={SingleChatScreen}
          />
          <MainStack.Screen name="ChatsScreen" component={ChatsScreen} />
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
    </MainStack.Navigator>
  );
}
