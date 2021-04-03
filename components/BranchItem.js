import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ALMOST_BLACK, LIGHTER_GREY, SECONDARY_COLOR} from '../utility/colors';
import {capitalize} from '../utility/helpers';
import MyButton from './MyButton';

export default function BranchItem({item, onDelete, isLoading}) {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.head}>{capitalize(item.restaurant_name)}</Text>
        <Text style={styles.bottom}>{item.address}</Text>
      </View>

      <MyButton
        style={styles.clearBtn}
        textStyle={styles.clearStyle}
        rightIcon="trash"
        iconColor={ALMOST_BLACK}
        iconSize={15}
        onPress={onDelete}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: LIGHTER_GREY,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  applyBtn: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    height: 32,
    marginTop: 6,
    alignSelf: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
  head: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
    marginBottom: 8,
  },
  middle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottom: {
    fontWeight: '100',
    fontSize: 12,
    color: SECONDARY_COLOR,
  },
  clearBtn: {
    width: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 0,
    elevation: 0,
    justifyContent: 'center',
  },
  clearStyle: {
    color: ALMOST_BLACK,
  },
});
