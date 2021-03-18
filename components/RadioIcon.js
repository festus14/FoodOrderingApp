import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR} from '../utility/colors';

const RadioIcon = ({checked, onCheck}) => {
  return (
    <TouchableOpacity onPress={onCheck}>
      {checked ? (
        <Icon
          name="ios-radio-button-on-outline"
          color={SECONDARY_COLOR}
          size={22}
        />
      ) : (
        <Icon
          name="ios-radio-button-off-outline"
          color={SECONDARY_COLOR}
          size={22}
        />
      )}
    </TouchableOpacity>
  );
};

export default RadioIcon;

const styles = StyleSheet.create({});
