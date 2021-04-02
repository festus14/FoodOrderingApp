/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Alert,
  Modal,
  Image,
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
import {
  resetCart,
  deleteCart,
  updateCart,
  setCheckoutInfo,
} from '../../store/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '../../components/DateTimePicker';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';
import {getTime, isEmpty} from '../../utility/helpers';

export default function CheckoutScreen({navigation, route}) {
  const {
    state: {
      ui: {isCartLoading: isLoading, isOrdersLoading},
      cart: {cart, subtotal, checkoutInfo},
      user: {userAddress, user},
    },
    dispatch,
  } = useContext(Store);
  const {title} = route.params;
  const [position, setPosition] = useState('left');
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const setPositionHandler = async (pos) => {
    setPosition(pos);
    if (pos === 'left') {
      await dispatch(setCheckoutInfo({deliveryMode: 'DELIVERY'}));
      setDeliveryMode('delivery');
    } else {
      await dispatch(setCheckoutInfo({deliveryMode: 'PICK UP'}));
      setDeliveryMode('pickUp');
    }
  };

  useEffect(() => {
    setPositionHandler('left');
  }, []);

  const resetCartHandler = async () => {
    Alert.alert('Warning', 'Are you sure you want to clear your cart?', [
      {
        text: 'Close',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Clear',
        onPress: async () => {
          await dispatch(resetCart());
        },
      },
    ]);
  };

  const deleteItemHandler = async (id) => {
    if (checkoutInfo.promoVal !== 0) {
      await dispatch(setCheckoutInfo({promoVal: 0}));
    }
    await dispatch(deleteCart(id));
  };

  const incrementHandler = async (id, isInc) => {
    if (checkoutInfo.promoVal !== 0) {
      await dispatch(setCheckoutInfo({promoVal: 0}));
    }
    if (isInc) {
      await dispatch(updateCart(id, +1));
    } else {
      await dispatch(updateCart(id, -1));
    }
  };

  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    let totals =
      +subtotal +
      (Number.isInteger(checkoutInfo?.delivery_fee)
        ? +checkoutInfo?.delivery_fee
        : 0) +
      +(subtotal * 0.03) -
      +(checkoutInfo?.promoVal ?? 0);

    if (deliveryMode === 'pickUp') {
      totals =
        totals -
        (Number.isInteger(checkoutInfo?.delivery_fee)
          ? +checkoutInfo?.delivery_fee
          : 0);
    }

    totals = Math.round(totals);
    setTotal(totals);
    await dispatch(setCheckoutInfo({total: totals}));
    return totals;
  };

  useEffect(() => {
    getTotal();
  }, [subtotal, checkoutInfo.promoVal, cart.count, deliveryMode]);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const setDateHandler = (newDate) => {
    setDate(newDate);
  };

  const saveTimeHandler = async () => {
    setTime(getTime(date));
    await dispatch(setCheckoutInfo({pickupTime: getTime(date)}));
    setModalVisible(false);
  };

  const checkDeliveryMode = () => {
    if (deliveryMode === 'pickUp' && isEmpty(time)) {
      Alert.alert('Error', 'Please enter a pickup time');
    } else {
      navigation.navigate('PaymentScreen');
    }
  };

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title={title}
        onLeftPress={() => navigation.goBack()}
      />

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="time"
                date={date}
                onSetDate={setDateHandler}
              />
              <MyButton
                style={styles.modalBtn}
                text="Save"
                textStyle={styles.modalText}
                onPress={saveTimeHandler}
              />
            </View>
          </View>
        </Modal>
      )}

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

            {cart.map((item) => (
              <CheckoutItem
                key={item.id}
                item={item}
                navigation={navigation}
                deleteItem={deleteItemHandler}
                increment={incrementHandler}
              />
            ))}

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

          <TouchableOpacity
            style={styles.promo}
            onPress={() => navigation.navigate('PromoScreen')}>
            <View style={styles.promoLeft}>
              <View style={styles.promoBadge}>
                <Image
                  source={require('../../assets/images/promo.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
              <View style={styles.promoCenter}>
                <Text style={styles.promoTitle}>Apply Promo Code</Text>
                <Text style={styles.promoText}>
                  {checkoutInfo?.promoVal > 0
                    ? 'Promo code applied'
                    : 'No promo code used'}
                </Text>
              </View>
            </View>
            <View style={styles.promoIcon}>
              <Icon
                name="ios-chevron-forward-outline"
                color={ALMOST_BLACK}
                size={30}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.cost}>
            <CalculationItem title="Subtotal" value={subtotal} />
            {deliveryMode === 'delivery' && (
              <CalculationItem
                title="Delivery Fee"
                value={
                  Number.isInteger(checkoutInfo?.delivery_fee)
                    ? checkoutInfo?.delivery_fee
                    : '0'
                }
              />
            )}
            <CalculationItem
              title="Service Fee"
              value={Math.round(subtotal * 0.03)}
            />
            <CalculationItem
              title="Promo"
              value={checkoutInfo?.promoVal ?? 0}
              valStyle={{color: SECONDARY_COLOR}}
            />
          </View>

          <View style={styles.total}>
            <CalculationItem
              title="Grand Total"
              value={total}
              valStyle={{fontWeight: 'bold'}}
              titleStyle={{fontWeight: 'bold'}}
            />
          </View>

          <View style={styles.bottom}>
            {deliveryMode === 'delivery' ? (
              <>
                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Image
                      source={require('../../assets/images/delivery.png')}
                      resizeMode="contain"
                      style={[{height: 25, width: 25}]}
                    />
                  </View>
                  <View style={[styles.promoCenter]}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Delivery
                    </Text>
                    <Text style={styles.promoText}>
                      Delivery in{' '}
                      {checkoutInfo?.delivery_time?.slice(0, -4) ?? ''}s
                    </Text>
                  </View>
                </View>

                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      resizeMode="contain"
                      style={[{height: 25, width: 25}]}
                    />
                  </View>
                  <View style={{...styles.promoCenter, marginTop: 10}}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Delivery Location
                    </Text>
                    <Text style={styles.promoText}>{userAddress}</Text>
                  </View>
                </View>

                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Icon
                      name="ios-phone-portrait-outline"
                      color={SECONDARY_COLOR}
                      size={28}
                    />
                  </View>
                  <View style={{...styles.promoCenter, marginTop: 10}}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Phone Number
                    </Text>
                    <Text style={styles.promoText}>{user.phone}</Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Image
                      source={require('../../assets/images/delivery.png')}
                      resizeMode="contain"
                      style={[{height: 25, width: 25}]}
                    />
                  </View>
                  <View style={[styles.promoCenter]}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Distance from location
                    </Text>
                    <Text style={styles.promoText}>
                      {checkoutInfo.distance}
                    </Text>
                  </View>
                </View>

                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      resizeMode="contain"
                      style={[{height: 25, width: 25}]}
                    />
                  </View>
                  <View style={{...styles.promoCenter, marginTop: 10}}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Pickup Location
                    </Text>
                    <Text style={styles.promoText}>
                      {checkoutInfo?.pickupAddress ?? ''}
                    </Text>
                  </View>
                </View>

                <View style={styles.promoLeft}>
                  <View style={styles.promoBadge}>
                    <Image
                      source={require('../../assets/images/pickup-time.png')}
                      resizeMode="contain"
                      style={[{height: 25, width: 25}]}
                    />
                  </View>
                  <View style={{...styles.promoCenter, marginTop: 10}}>
                    <Text style={{...styles.promoTitle, fontSize: 15}}>
                      Pickup Time
                    </Text>

                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      style={styles.timeStyle}>
                      <Text style={styles.timeText}>{time}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>

          <MyButton
            style={styles.orderBtn}
            text="Place Order"
            onPress={checkDeliveryMode}
            isLoading={isOrdersLoading}
          />
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
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  timeStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.038,
    borderWidth: 1,
    borderColor: LIGHTER_GREY,
    borderRadius: 10,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    marginTop: 15,
    width: '30%',
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  timeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 200,
  },
};
