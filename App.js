import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StoreProvider} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {isMountedRef, navigationRef} from './RootNavigation';
import RootAppStackNavigator from './navigation/RootAppStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <RootAppStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
