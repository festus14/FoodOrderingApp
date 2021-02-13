import React, {useState, useContext} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import CheckoutItem from '../../components/CheckOutItem';
import Header from '../../components/Header';
import TopBar from '../../components/TopBar';
import MyButton from '../../components/MyButton';
import CalculationItem from '../../components/CalculationItem';
import {
  ALMOST_BLACK,
  LIGHTER_GREY,
  SECONDARY_COLOR,
} from '../../utility/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Store} from '../../store';
import {resetCart, deleteCart} from '../../store/actions';

export default function CheckoutModal({navigation, route}) {
  const {
    state: {
      ui: {isCartLoading: isLoading},
      cart: {cart},
    },
    dispatch,
  } = useContext(Store);
  const {title} = route.params;
  const [position, setPosition] = useState('left');
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const setPositionHandler = (pos) => {
    setPosition(pos);
    if (pos === 'left') {
      setDeliveryMode('delivery');
    } else {
      setDeliveryMode('pickUp');
    }
  };

  const resetCartHandler = async () => {
    Alert.alert('Warning', 'Are you sure you want to clear your cart?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async () => await dispatch(resetCart())},
    ]);
  };

  const deleteItemHandler = async (id) => {
    await dispatch(deleteCart(id));
  };
  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title={title}
        onLeftPress={() => navigation.goBack()}
      />

      <TopBar
        style={styles.topBar}
        tabBtn={styles.tabBtn}
        leftText="Delivery"
        rightText="Pick Up"
        position={position}
        setLeftPosition={setPositionHandler}
        setRightPosition={setPositionHandler}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.controls}>
            <View style={styles.controlHeader}>
              <Text style={styles.headerText}>Item(s)</Text>
              <Text style={[styles.headerText, styles.coloredText]}>
                Add Item(s)
              </Text>
            </View>

            <FlatList
              data={cart}
              renderItem={({item, index, separators}) => (
                <CheckoutItem
                  item={item}
                  navigation={navigation}
                  deleteItem={deleteItemHandler}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshing={false}
              onRefresh={() => console.warn('Refreshed')}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.clear}>
              <MyButton
                style={styles.clearBtn}
                text="Clear Cart"
                textStyle={styles.textStyle}
                rightIcon="trash"
                iconColor={ALMOST_BLACK}
                iconSize={15}
                onPress={resetCartHandler}
              />
            </View>
          </View>

          <View style={styles.promo}>
            <View style={styles.promoLeft}>
              <View style={styles.promoBadge}>
                <Icon
                  name="ios-chevron-forward-outline"
                  color={ALMOST_BLACK}
                  size={26}
                />
              </View>
              <View style={styles.promoCenter}>
                <Text style={styles.promoTitle}>Apply Promo Code</Text>
                <Text style={styles.promoText}>No promo selected</Text>
              </View>
            </View>
            <View style={styles.promoIcon}>
              <Icon
                name="ios-chevron-forward-outline"
                color={ALMOST_BLACK}
                size={26}
              />
            </View>
          </View>

          <View style={styles.cost}>
            <CalculationItem title="Subtotal" value="1250" />
            <CalculationItem title="Delivery Fee" value="1000" />
            <CalculationItem title="Service Fee" value="200" />
            <CalculationItem
              title="Promo"
              value="1250"
              valStyle={{color: SECONDARY_COLOR}}
            />
          </View>

          <View style={styles.total}>
            <CalculationItem
              title="Grand Total"
              value="200"
              valStyle={{fontWeight: 'bold'}}
              titleStyle={{fontWeight: 'bold'}}
            />
          </View>

          <View style={styles.bottom}>
            <View style={styles.promoLeft}>
              <View style={styles.promoBadge}>
                <Icon
                  name="ios-chevron-forward-outline"
                  color={ALMOST_BLACK}
                  size={26}
                />
              </View>
              <View style={[styles.promoCenter]}>
                <Text style={{...styles.promoTitle, fontSize: 15}}>
                  Delivery
                </Text>
                <Text style={styles.promoText}>Delivery in 110-130 mins</Text>
              </View>
            </View>

            <View style={styles.promoLeft}>
              <View style={styles.promoBadge}>
                <Icon
                  name="ios-chevron-forward-outline"
                  color={ALMOST_BLACK}
                  size={26}
                />
              </View>
              <View style={{...styles.promoCenter, marginTop: 10}}>
                <Text style={{...styles.promoTitle, fontSize: 15}}>
                  Delivery Location
                </Text>
                <Text style={styles.promoText}>
                  1 Omovie street, Okota, Lagos
                </Text>
              </View>
            </View>

            <View style={styles.promoLeft}>
              <View style={styles.promoBadge}>
                <Icon
                  name="ios-chevron-forward-outline"
                  color={ALMOST_BLACK}
                  size={26}
                />
              </View>
              <View style={{...styles.promoCenter, marginTop: 10}}>
                <Text style={{...styles.promoTitle, fontSize: 15}}>
                  Phone Number
                </Text>
                <Text style={styles.promoText}>+2347056789045</Text>
              </View>
            </View>
          </View>

          <MyButton style={styles.orderBtn} text="Place Order" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = {
  topTab: {},
  tabBtn: {
    height: 36,
    width: 100,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  topBar: {
    marginVertical: 15,
  },
  contentContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  coloredText: {
    color: SECONDARY_COLOR,
  },
  clear: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  clearBtn: {
    width: '27%',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  textStyle: {
    color: ALMOST_BLACK,
    fontSize: 14,
    paddingRight: 6,
  },
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: LIGHTER_GREY,
    paddingVertical: 22,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoBadge: {
    paddingRight: 20,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cost: {
    marginTop: 12,
  },
  total: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: LIGHTER_GREY,
    paddingVertical: 5,
  },

  orderBtn: {
    marginVertical: 35,
  },
};
