import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function FoodItem({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SingleFoodScreen')}>
      <View>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Spicy Rice</Text>
        <Text style={styles.body}>
          Basmati rice made with fresh traditional spices
        </Text>
        <Text style={styles.price}>₦1500</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.11,
    width: SCREEN_WIDTH * 0.8,
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
  },
  body: {
    fontWeight: '100',
  },
  price: {
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
  },
};
