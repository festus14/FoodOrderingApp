import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {LIGHT_GREY, SECONDARY_COLOR} from '../utility/colors';

export default function PaymentItem({navigation}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PaystackScreen')}>
      <View>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>Pay now securely with Paystack</Text>
        <Text style={styles.body}>Mastercard, verve, visa</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    paddingVertical: 10,
  },
  image: {
    height: 65,
    width: 65,
  },
  content: {
    paddingLeft: 13,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
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
  price: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  countText: {
    color: '#fff',
    backgroundColor: SECONDARY_COLOR,
    textAlign: 'center',
    width: 18,
    borderRadius: 5,
  },
};
