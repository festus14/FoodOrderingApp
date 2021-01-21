import React from 'react';
import {View, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SCREEN_HEIGHT} from '../utility/constants';
import {GREY, LIGHTER_GREY, LIGHT_GREY} from '../utility/colors';

const InputText = ({
  containerStyle = {},
  icon,
  iconSize,
  iconStyle = {},
  iconColor,
  inputStyle = {},
  titleStyle = {},
  getRef = () => {},
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && (
        <Icon
          name={icon}
          style={[styles.icon, iconStyle]}
          size={iconSize}
          color={iconColor}
        />
      )}
      <Text style={[styles.title, titleStyle]}>{props.title}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        {...props}
        ref={(input) => {
          getRef(input);
        }}
      />
    </View>
  );
};

export default InputText;

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: LIGHTER_GREY,
    borderBottomWidth: 1,
    marginBottom: SCREEN_HEIGHT * 0.02,
    width: '100%',
  },
  icon: {
    width: '12%',
    textAlign: 'center',
  },
  input: {
    paddingBottom: 10,
    paddingRight: 10,
    fontSize: 20,
    flex: 1,
  },
  title: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: '100',
  },
};
