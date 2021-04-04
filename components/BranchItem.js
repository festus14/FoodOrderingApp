import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ALMOST_BLACK, LIGHTER_GREY, SECONDARY_COLOR} from '../utility/colors';
import MyButton from './MyButton';

export default function BranchItem({item, onDelete, isLoading, navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.text}
        onPress={() => navigation.navigate('AddBranchScreen', {item})}>
        <Text style={styles.head}>{item.restaurant_name}</Text>
        <Text style={styles.bottom}>{item.address}</Text>
      </TouchableOpacity>

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
    fontSize: 18,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  middle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottom: {
    fontWeight: '100',
    fontSize: 14,
    color: SECONDARY_COLOR,
    textTransform: 'capitalize',
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
