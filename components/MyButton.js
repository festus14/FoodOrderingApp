import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MAIN_COLOR} from '../utility/colors';
import {isEmpty} from '../utility/helpers';

const MyButton = ({
  icon,
  rightIcon,
  style = {},
  iconStyle = {},
  iconSize = 16,
  iconColor = '#fff',
  isLoading = false,
  text = '',
  loading = {size: 16, color: '#fff'},
  textStyle = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      {...props}
      style={[styles.container, style]}>
      {isLoading ? (
        <ActivityIndicator
          style={{height: loading.size, width: loading.size}}
          color={loading.color}
        />
      ) : (
        <>
          <View style={iconStyle}>
            {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
          </View>

          {!isEmpty(text) && (
            <Text style={[styles.text, textStyle || {}]}>{text}</Text>
          )}

          <View>
            {rightIcon && (
              <Icon name={rightIcon} size={iconSize} color={iconColor} />
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 310,
    alignItems: 'center',
    alignSelf: 'center',
    height: 40,
    backgroundColor: MAIN_COLOR,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(77, 84, 124)',
        shadowOpacity: 0.09,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
};
