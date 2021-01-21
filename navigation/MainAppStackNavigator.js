import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, View} from 'react-native';
import LandingScreen from '../screens/LandingScreen';
import AuthStackNavigator from './AuthStackNavigator';
import HomeBottomNavigator from './HomeBottomNavigator';

const MainStack = createStackNavigator();

export default function MainAppNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      setIsLoading(true);
      try {
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, []);

  if (isLoading) {
    //    TODO: Implement splash screen
    //   return <SplashScreen />;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={40} />
      </View>
    );
  }

  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="LandingScreen" component={LandingScreen} />
      <MainStack.Screen
        name="AuthStackNavigator"
        component={AuthStackNavigator}
      />
      <MainStack.Screen
        name="HomeBottomNavigator"
        component={HomeBottomNavigator}
      />
    </MainStack.Navigator>
  );
}

const styles = {
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
};
