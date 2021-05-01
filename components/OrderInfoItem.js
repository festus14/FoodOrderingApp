import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  GREY,
  LIGHTER_GREY,
  LIGHT_GREY,
  SECONDARY_COLOR,
} from '../utility/colors';
import {SCREEN_HEIGHT} from '../utility/constants';
import MyImage from './MyImage';

export default function OrderInfoItem({item}) {
  return (
    <View style={styles.container}>
      <MyImage
        uri={item?.menu_item?.food_image}
        priority="normal"
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.menu_item.name}</Text>
        <Text style={styles.text}>{item.variant.variant_name}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>₦{item.price}</Text>
          <Text style={styles.countText}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.046,
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    height: 65,
    width: 65,
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  body: {
    fontWeight: '100',
  },
  price: {
    color: SECONDARY_COLOR,
    paddingLeft: 12,
  },
  bottom: {
    width: '69%',
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    color: '#fff',
    backgroundColor: SECONDARY_COLOR,
    textAlign: 'center',
    width: 18,
    borderRadius: 5,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 12,
    color: LIGHT_GREY,
    paddingLeft: 12,
  },
});
