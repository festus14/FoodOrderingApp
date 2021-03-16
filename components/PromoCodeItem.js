import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {LIGHTER_GREY, SECONDARY_COLOR} from '../utility/colors';
import MyButton from './MyButton';

const PromoCodeItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.head}>FREE50</Text>
        <Text style={styles.middle}>50% off</Text>
        <Text style={styles.bottom}>
          Up to 50% off any meal for new customers
        </Text>
      </View>

      <MyButton
        style={styles.applyBtn}
        text="APPLY"
        textStyle={styles.textStyle}
        onPress={() => {}}
        // isLoading={isLoading}
      />
    </View>
  );
};

export default PromoCodeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: LIGHTER_GREY,
    borderBottomWidth: 1,
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
    color: SECONDARY_COLOR,
    fontSize: 17,
  },
  middle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottom: {
    fontWeight: '100',
    fontSize: 12,
  },
});
