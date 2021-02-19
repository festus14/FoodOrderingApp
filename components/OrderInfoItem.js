import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function OrderInfoItem({item, navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item?.menu_item?.food_image}}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.menu_item.name}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>#{item.price}</Text>
          <Text style={styles.countText}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = {
  container: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.045,
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
    marginTop: 18,
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
};
