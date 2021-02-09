import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import SearchBar from './SearchBar';
import {SCREEN_WIDTH} from '../utility/constants';

navigator.geolocation = require('react-native-geolocation-service');

const GooglePlacesInput = ({setLocation = () => {}, onSearch = () => {}}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search location"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setLocation(data.description);
      }}
      query={{
        key: 'AIzaSyCFVVIaYQpkVBWFalnI2WiYkPtJWwGrd_E',
        language: 'en',
      }}
      // currentLocation={true}
      // currentLocationLabel="Current location"
      textInputProps={{
        InputComp: SearchBar,
        returnKeyType: 'search',
        leftIcon: 'ios-location-sharp',
        title: 'Search location',
        style: {
          width: SCREEN_WIDTH * 0.8,
          marginTop: 30,
          marginHorizontal: SCREEN_WIDTH * 0.1,
          borderRadius: 5,
        },
        inputStyle: {},
        onSearch: () => onSearch(),
      }}
    />
  );
};

export default GooglePlacesInput;
