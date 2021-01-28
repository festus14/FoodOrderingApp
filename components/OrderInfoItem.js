import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function OrderInfoItem({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('OrderDetailsScreen')}>
      <View>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Spicy Rice</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>#1500</Text>
          <Text style={styles.countText}>1</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.11,
  },
  image: {
    height: 65,
    width: 65,
  },
  content: {
    justifyContent: 'space-around',
    paddingLeft: 12,
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
    width: '65%',
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
