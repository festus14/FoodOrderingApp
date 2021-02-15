import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function OrderItem({item, navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('OrderDetailsScreen', {item})}>
      <View>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Spicy Rice</Text>
        <Text style={styles.body}>ORDER ID: 01120WD</Text>
        <View style={styles.stateBack}>
          <Text style={styles.state}>{item.status_of_order}</Text>
        </View>
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
  state: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
  stateBack: {
    width: 70,
    height: 18,
    backgroundColor: '#009C22',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
};
