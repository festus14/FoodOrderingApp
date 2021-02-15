import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {LIGHTER_GREY, MAIN_COLOR} from '../utility/colors';

const TopBar = ({
  leftText,
  rightText,
  setLeftPosition,
  setRightPosition,
  position,
  style = {},
  tabBtn,
}) => {
  const getStyle = (state, isText) =>
    state === position ? (isText ? styles.activeText : styles.activeTab) : {};
  return (
    <View style={[styles.topTab, style]}>
      <TouchableOpacity
        onPress={() => setLeftPosition('left')}
        style={[styles.tabBtn, tabBtn, styles.leftBtn, getStyle('left')]}>
        <Text style={[styles.tabText, getStyle('left', true)]}>{leftText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRightPosition('right')}
        style={[styles.tabBtn, tabBtn, getStyle('right')]}>
        <Text style={[styles.tabText, getStyle('right', true)]}>
          {rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = {
  topTab: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tabBtn: {
    width: 120,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHTER_GREY,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  leftBtn: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabText: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: MAIN_COLOR,
  },
  activeText: {
    color: '#fff',
  },
};
