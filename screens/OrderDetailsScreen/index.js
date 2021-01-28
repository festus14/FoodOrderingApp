import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodItem from '../../components/FoodItem';
import Header from '../../components/Header';
import OrderInfoItem from '../../components/OrderInfoItem';
import {LIGHTER_GREY, SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';

const DATA = [
  {
    id: 1,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 2,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 3,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 4,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 5,
    imageURL: '../../assets/images/burger.png',
  },
];

const DATA_TWO = [
  {
    id: 1,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 2,
    imageURL: '../../assets/images/burger.png',
  },
];

const OrderDetailsScreen = ({navigation}) => {
  const goBack = () => navigation.goBack();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header leftIcon="ios-arrow-back" title="Order" onLeftPress={goBack} />

        <ScrollView style={styles.container}>
          <View style={styles.orderInfo}>
            <Text style={styles.title}>ORDER ID: 01120WD</Text>
            <Text style={styles.time}>Placed on: 02-03-2021</Text>
            <View style={styles.infoBottom}>
              <Text style={styles.vendor}>KFC</Text>
              <View style={styles.stateBack}>
                <Text style={styles.state}>COMPLETED</Text>
              </View>
            </View>
          </View>

          <Text style={styles.orderTitle}>ITEMS ORDERED</Text>

          <View style={styles.orderInfo}>
            <OrderInfoItem item={DATA} navigation={navigation} />
            <OrderInfoItem item={DATA} navigation={navigation} />
            <OrderInfoItem item={DATA} navigation={navigation} />
          </View>

          <Text style={styles.orderTitle}>DELIVERY</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.title}>Delivery option</Text>
            <Text style={styles.time}>Home Delivery</Text>
            <Text style={styles.title}>Delivery address</Text>
            <Text style={styles.time}>1 Omovie street, Okota, Lagos</Text>
          </View>

          <Text style={styles.orderTitle}>PAYMENT DETAILS</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.time}>
              Items total: <Text style={styles.title}>N6000</Text>
            </Text>
            <Text style={styles.time}>
              Delivery fee: <Text style={styles.title}>N6000</Text>
            </Text>
            <Text style={styles.time}>
              Service charge: <Text style={styles.title}>N6000</Text>
            </Text>
            <Text style={styles.time}>
              Total: <Text style={styles.title}>N6000</Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderDetailsScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: LIGHTER_GREY,
  },
  orderInfo: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 18,
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
  },
  title: {
    fontWeight: 'bold',
  },
  vendor: {
    fontWeight: 'bold',
  },
  time: {
    fontWeight: '100',
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 18,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingLeft: 18,
  },
};
