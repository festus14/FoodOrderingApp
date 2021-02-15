import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodItem from '../../components/FoodItem';
import Header from '../../components/Header';
import OrderItem from '../../components/OrderItem';
import {SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {getOrders} from '../../store/actions/orders';

const OrdersScreen = ({navigation}) => {
  const {
    state: {
      ui: {isOrdersLoading: isLoading},
      cart: {cart},
      orders: {openOrders, closedOrders},
    },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    const fetchOrders = async () => {
      if (openOrders.length < 1 && closedOrders.length < 1) {
        let error = await dispatch(getOrders());
      }
    };

    fetchOrders();
  }, []);

  const [locale, setLocale] = useState('pending');

  const goBack = () => navigation.goBack();

  const view =
    locale === 'pending' ? (
      <FlatList
        data={openOrders}
        renderItem={({item, index, separators}) => (
          <OrderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        onRefresh={() => console.warn('Refreshed')}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <FlatList
        data={closedOrders}
        renderItem={({item, index, separators}) => (
          <OrderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        onRefresh={() => console.warn('Refreshed')}
        showsVerticalScrollIndicator={false}
      />
    );

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Orders"
          rightIcon={cart.length > 0 && 'ios-cart-outline'}
          onRightPress={() =>
            navigation.navigate('CheckoutModal', {title: 'Checkout'})
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

          {view}
        </View>
      </SafeAreaView>
    </>
  );
};

export default OrdersScreen;

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
};
