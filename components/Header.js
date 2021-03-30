import React from 'react';
import {Text, View, TouchableOpacity, Platform, StatusBar} from 'react-native';
import {MAIN_COLOR, SECONDARY_COLOR} from '../utility/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from '../utility/constants';
import {isEmpty} from '../utility/helpers';

const Header = ({
  style = {},
  leftColor = '#fff',
  size = 30,
  titleStyle = {},
  rightColor = '#fff',
  rightIcon,
  leftIcon,
  title = '',
  component,
  onLeftPress,
  onRightPress,
  details,
  textStyle = {},
}) => {
  return (
    <View style={[styles.header, style]}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor={MAIN_COLOR}
        translucent={true}
      />
      {Platform.OS !== 'android' && <View style={styles.status} />}
      <View style={[styles.details, details]}>
        <View style={styles.iconContainer}>
          {leftIcon && (
            <TouchableOpacity onPress={onLeftPress} style={styles.icon}>
              <Icon name={leftIcon} color={leftColor} size={size} />
            </TouchableOpacity>
          )}
        </View>
        {component ?? component}
        {!isEmpty(title) && (
          <View style={[styles.textContainer, titleStyle]}>
            <Text style={[styles.text, textStyle]}>{title || ''}</Text>
          </View>
        )}
        <View style={styles.iconContainer}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.icon}>
              <Icon name={rightIcon} color={rightColor} size={size} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = {
  header: {
    backgroundColor: MAIN_COLOR,
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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.1,
    justifyContent: 'center',
    paddingTop: 25,
  },
  status: {
    height: STATUS_BAR_HEIGHT,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: '10%',
  },
  // paddingTop: 20,
};
