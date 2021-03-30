import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import ConsumerMapScreen from '../screens/ConsumerMapScreen';
import AuthStackNavigator from './AuthStackNavigator';
import ConsumerBottomNavigator from './ConsumerBottomNavigator';
import {Store} from '../store';
import CheckoutScreen from '../screens/CheckoutScreen';
import SingleChatScreen from '../screens/SingleChatScreen';
import ChatsScreen from '../screens/ChatsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaystackScreen from '../screens/PaystackScreen';
import AddMenuModal from '../screens/AddMenuModal';
import PromoScreen from '../screens/PromoScreen';
import RestaurantStackNavigator from './RestaurantStackNavigator';

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
          <MainStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <MainStack.Screen name="PromoScreen" component={PromoScreen} />
          <MainStack.Screen name="PaymentScreen" component={PaymentScreen} />
          <MainStack.Screen name="PaystackScreen" component={PaystackScreen} />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="RestaurantStackNavigator"
            component={RestaurantStackNavigator}
          />
          <MainStack.Screen name="AddMenuModal" component={AddMenuModal} />
        </>
      )}
    </MainStack.Navigator>
  );
}
