import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import {trimString} from '../utility/helpers';
import MyImage from './MyImage';

export default function FoodItem({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SingleFoodScreen', {item})}>
      <View style={styles.imageContainer}>
        <MyImage
          uri={item.food_image}
          priority="normal"
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.body}>{trimString(item.description, 100)}</Text>
        <Text style={styles.price}>₦{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.13,
    width: SCREEN_WIDTH * 0.8,
  },
  imageContainer: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '100%',
  },
  content: {
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 20,
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
