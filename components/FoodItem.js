import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function FoodItem({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SingleFoodScreen', {item})}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.food_image}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.body}>{item.description}</Text>
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
    // alignItems: 'center',
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
    // borderRadius: 100000,
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
