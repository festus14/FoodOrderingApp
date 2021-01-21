import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {isEmpty} from '../utility/helpers';

const RadioButton = ({
  button = {size: 20, color: SECONDARY_COLOR, selected: true, label: ''},
  radioButton = {},
  radioButtonHolder = {},
  radioIcon = {},
  label = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.radioButton, radioButton]}>
      <View
        style={[
          styles.radioButtonHolder,
          radioButtonHolder,
          {
            height: button.size,
            width: button.size,
            borderColor: button.color,
          },
        ]}>
        {button.selected && (
          <View
            style={[
              styles.radioIcon,
              radioIcon,
              {
                height: button.size / 2,
                width: button.size / 2,
                backgroundColor: button.color,
              },
            ]}
          />
        )}
      </View>
      {!isEmpty(button.label) && (
        <Text style={[styles.label, label, {color: button.color}]}>
          {button.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = {
  radioButton: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: 10,
    fontSize: 20,
  },
};
