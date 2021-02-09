/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Header from '../../components/Header';
import GooglePlacesInput from '../../components/GooglePlacesInput';
import {MAIN_COLOR} from '../../utility/colors';
import {Store} from '../../store';
import MyButton from '../../components/MyButton';
import {SCREEN_HEIGHT} from '../../utility/constants';
import Geolocation from 'react-native-geolocation-service';
import {isEmpty} from '../../utility/helpers';
import {getVendors} from '../../store/actions';

const ConsumerMapScreen = ({navigation}) => {
  const {
    state: {
      ui: {isVendorsLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [authError, setAuthError] = useState('');
  const [location, setLocation] = useState();

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [initialRegion, setInitialRegion] = useState(null);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        return true;
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          } else {
            return false;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
    };

    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const currentLongitude = position.coords.longitude;
          const currentLatitude = position.coords.latitude;

          setCurrentLongitude(currentLongitude);

          setCurrentLatitude(currentLatitude);

          setInitialRegion({
            ...region,
            latitude: +currentLatitude,
            longitude: +currentLongitude,
          });

          setRegion({
            ...region,
            latitude: +currentLatitude,
            longitude: +currentLongitude,
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, []);

  const setError = (error) => {
    setAuthError(error);
    Alert.alert('Error', error);

    setTimeout(() => {
      setAuthError('');
    }, 5000);
  };

  const setSuccess = (message) => {
    setAuthError(message);
    Alert.alert('Success', message);

    setTimeout(() => {
      setAuthError('');
    }, 5000);
  };

  const searchLocationHandler = async () => {
    if (!isEmpty(location)) {
      try {
        let locationData = {delivery_address: location};
        let error = await dispatch(getVendors(locationData));
        if (error) {
          setError(error);
        }
      } catch (e) {}
    }
  };

  const view = initialRegion ? (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialRegion}
      region={region}>
      <Marker
        key={1}
        coordinate={{latitude: region.latitude, longitude: region.longitude}}
        title={'Location'}
        description={'Your current location'}
      />
    </MapView>
  ) : (
    <ActivityIndicator style={{height: 16, width: 16}} color={MAIN_COLOR} />
  );

  return (
    <>
      <Header title="Location" />

      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>{view}</View>
        <GooglePlacesInput
          setLocation={setLocation}
          onSearch={searchLocationHandler}
        />

        <MyButton
          text="Choose this address"
          style={styles.button}
          onPress={searchLocationHandler}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default ConsumerMapScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.015,
  },
});
