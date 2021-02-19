import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatsScreen from '../screens/ChatsScreen';
import SingleChatScreen from '../screens/SingleChatScreen';

const Stack = createStackNavigator();

export default function ChatsStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
    </Stack.Navigator>
  );
}
