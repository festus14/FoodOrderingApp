/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import OrderItem from '../../components/OrderItem';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {restaurantSignIn} from '../../store/actions';
import EmptyComponent from '../../components/EmptyComponent';

const RestaurantOrdersScreen = ({navigation}) => {
  const {
    state: {
      ui: {isOrdersLoading: isLoading},
      cart: {cart},
      orders: {openOrders, closedOrders},
      user: {
        user: {userName},
      },
    },
    dispatch,
  } = useContext(Store);

  const fetchOrders = async () => {
    let error = await dispatch(restaurantSignIn({username: userName}));
    if (error) {
      Alert.alert('Error', error);
    }
  };

  const [locale, setLocale] = useState('pending');

  const view =
    locale === 'pending' ? (
      <FlatList
        data={openOrders}
        renderItem={({item, index, separators}) => (
          <OrderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={fetchOrders}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyComponent text="pending order" onRefresh={fetchOrders} />
        }
      />
    ) : (
      <FlatList
        data={closedOrders}
        renderItem={({item, index, separators}) => (
          <OrderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={fetchOrders}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyComponent text="closed order" onRefresh={fetchOrders} />
        }
      />
    );

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Orders"
          rightIcon={cart.length > 0 && 'ios-cart-outline'}
          onRightPress={() =>
            navigation.navigate('CheckoutScreen', {title: 'Checkout'})
          }
        />

        <View style={styles.container}>
          <View style={styles.topTabs}>
            <View
              style={[
                styles.topTab,
                locale === 'pending' && styles.activeTopTab,
              ]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setLocale('pending')}>
                <Text style={styles.topText}>Pending</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.topTab,
                locale === 'closed' && styles.activeTopTab,
              ]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setLocale('closed')}>
                <Text style={styles.topText}>Closed</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={30} color={MAIN_COLOR} />
            </View>
          ) : (
            view
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default RestaurantOrdersScreen;

const styles = {
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  infoImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
  },
  bImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: '#fff',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoHeader: {},
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  topTabs: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTab: {
    color: '#fff',
    justifyContent: 'flex-end',
    width: '50%',
  },
  activeTopTab: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
  },
  topText: {
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};
