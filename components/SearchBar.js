import React from 'react';
import {View, TextInput, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR} from '../utility/colors';

export default function SearchBar({
  style = {},
  size = 30,
  titleStyle = {},
  rightIcon,
  leftIcon,
  title = '',
  onLeftPress,
  onRightPress,
  inputStyle,
  onSearch,
  ...props
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.icon}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.icon}>
            <Icon name={leftIcon} color={SECONDARY_COLOR} size={size} />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={[styles.input, inputStyle]}
        onSubmitEditing={onSearch}
        {...props}
      />
      <View style={styles.icon}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.icon}>
            <Icon name={rightIcon} color={SECONDARY_COLOR} size={size} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(190, 190, 190)',
        shadowOpacity: 0.6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingBottom: 8,
    paddingRight: 10,
    fontSize: 17,
    flex: 1,
  },
};
