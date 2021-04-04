import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {OCEAN_BLUE} from '../utility/colors';
import {capitalize} from '../utility/helpers';
import MyImage from './MyImage';

export default function OrderItem({item, navigation}) {
  const getStateColor = () => {
    switch (item.status_of_order) {
      case 'PENDING':
        return '#FBBC05';
      case 'COMPLETE':
        return '#009C22';
      case 'CANCELLED':
        return '#FF1500';
      case 'ACCEPTED':
        return 'green';
      case 'ORDER_READY':
        return OCEAN_BLUE;
      default:
        return '#FBBC05';
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('RestaurantOrderDetailsScreen', {item})
      }>
      <View>
        <MyImage
          uri={item?.restaurant?.restaurant_image}
          resizeMode="cover"
          priority="high"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {capitalize(item?.restaurant?.restaurant_name ?? '')}
        </Text>
        <Text style={styles.body}>ORDER ID: {item?.id.slice(0, 6)}...</Text>
        <View style={{...styles.stateBack, backgroundColor: getStateColor()}}>
          <Text style={styles.state}>{item.status_of_order}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  image: {
    height: 65,
    width: 65,
  },
  content: {
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  body: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  state: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
  stateBack: {
    width: 80,
    height: 20,
    backgroundColor: '#009C22',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};
