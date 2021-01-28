import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR} from '../utility/colors';

const Checkbox = ({
  checkSize = 12,
  checkColor = '#fff',
  containerStyle = {},
  isChecked = false,
  onPress = () => {},
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          containerStyle,
          isChecked && {backgroundColor: SECONDARY_COLOR, borderWidth: 0},
        ]}>
        {isChecked && (
          <Icon name="md-checkmark" color={checkColor} size={checkSize} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Checkbox;

const styles = {
  container: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
