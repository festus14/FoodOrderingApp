import React, {useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import Header from '../../components/Header';
import MyButton from '../../components/MyButton';
import OrderInfoItem from '../../components/OrderInfoItem';
import {Store} from '../../store';
import {cancelOrder, acceptOrder} from '../../store/actions';
import {
  LIGHTER_GREY,
  LIGHT_BLUE,
  OCEAN_BLUE,
  SECONDARY_COLOR,
} from '../../utility/colors';
import {capitalize} from '../../utility/helpers';

const RestaurantOrderDetailScreen = ({navigation, route}) => {
  const item = route.params.item;

  console.log('Item...', item);

  const {
    state: {
      ui: {isOrdersLoading: isLoading, isReInitiateLoading},
    },
    dispatch,
  } = useContext(Store);

  const goBack = () => navigation.goBack();

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

  const cancelOrderHandler = async () => {
    Alert.alert('Warning', 'Are you sure you want to cancel this order?', [
      {
        text: 'Close',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Cancel',
        onPress: async () => {
          let error = await dispatch(cancelOrder(item.id, true));
          if (error) {
            Alert.alert('Error', error);
          } else {
            navigation.navigate('RestaurantOrdersScreen');
            Alert.alert(
              'Success',
              'Your order has been successfully cancelled',
            );
          }
        },
      },
    ]);
  };

  const acceptOrderHandler = async (isOrderReady) => {
    Alert.alert(
      'Info',
      `${
        isOrderReady
          ? 'Are you certain this order is ready?'
          : 'Are you sure you want to accept this order?'
      }`,
      [
        {
          text: 'Close',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            let error = await dispatch(acceptOrder(item.id, isOrderReady));
            if (error) {
              Alert.alert('Error', error);
            } else {
              Alert.alert(
                'Success',
                `${
                  isOrderReady
                    ? 'Order is ready'
                    : 'Your order has been successfully accepted'
                }`,
              );
              navigation.navigate('RestaurantOrdersScreen');
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header leftIcon="ios-arrow-back" title="Order" onLeftPress={goBack} />

        <ScrollView style={styles.container}>
          <View style={styles.orderInfo}>
            <Text style={styles.title}>
              ORDER ID: {item?.id.slice(0, 6)}...
            </Text>
            <Text style={styles.time}>
              Placed on: {item?.created_at.slice(0, 10)}
            </Text>
            <View style={styles.infoBottom}>
              <Text style={styles.vendor}>
                {item?.restaurant?.restaurant_name ?? ''}
              </Text>
              <View
                style={{
                  ...styles.stateBack,
                  backgroundColor: getStateColor(),
                }}>
                <Text style={styles.state}>{item.status_of_order}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.orderTitle}>ITEMS ORDERED</Text>
          <View style={styles.orderInfo}>
            {item.ordereditem.map((elem) => (
              <OrderInfoItem
                key={elem.menu_item.id}
                item={elem}
                navigation={navigation}
              />
            ))}

            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {item.status_of_order === 'ACCEPTED' && (
                <MyButton
                  style={[styles.inBtn, {backgroundColor: OCEAN_BLUE}]}
                  text="ORDER READY"
                  textStyle={styles.textStyle}
                  onPress={() => acceptOrderHandler(true)}
                  isLoading={isReInitiateLoading}
                />
              )}
              {item.payment_successful &&
                item.status_of_order !== 'ACCEPTED' &&
                item.status_of_order !== 'CANCELLED' &&
                item.status_of_order !== 'ORDER_READY' && (
                  <MyButton
                    style={styles.inBtn}
                    text="ACCEPT ORDER"
                    textStyle={styles.textStyle}
                    onPress={acceptOrderHandler}
                    isLoading={isReInitiateLoading}
                  />
                )}
              {(item.status_of_order === 'PENDING' ||
                item.status_of_order === 'ACCEPTED') && (
                <MyButton
                  style={styles.cancelBtn}
                  text="CANCEL ORDER"
                  textStyle={styles.textStyle}
                  onPress={cancelOrderHandler}
                  isLoading={isLoading}
                />
              )}
            </View>
          </View>

          <Text style={styles.orderTitle}>DELIVERY</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.title}>Delivery option</Text>
            <Text style={styles.time}>{item.order_type}</Text>
            {item.order_type !== 'PICK UP' ? (
              <>
                <Text style={styles.title}>Delivery address</Text>
                <Text style={styles.time}>{item.delivery_address}</Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>Pickup time</Text>
                <Text style={styles.time}>{item.pick_up_time}</Text>
              </>
            )}
          </View>

          <Text style={styles.orderTitle}>PAYMENT DETAILS</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.time}>
              Items total:{' '}
              <Text style={styles.title}>
                ₦
                {item.ordereditem.reduce(
                  (sum, num) => sum + num.price * num.quantity,
                  0,
                ) || 0}
              </Text>
            </Text>
            {item.order_type !== 'PICK UP' && (
              <Text style={styles.time}>
                Delivery fee:{' '}
                <Text style={styles.title}>₦{item.delivery_fee}</Text>
              </Text>
            )}
            <Text style={styles.time}>
              Service charge:{' '}
              <Text style={styles.title}>₦{item.service_fee}</Text>
            </Text>
            <View style={styles.last}>
              <Text style={styles.time}>
                Total: <Text style={styles.title}>₦{item.subtotal_fee}</Text>
              </Text>

              {item.status_of_order === 'PENDING' && (
                <MyButton
                  style={styles.chatBtn}
                  text="Chat with customer"
                  textStyle={[
                    styles.textStyle,
                    {width: '50%', textAlign: 'center'},
                  ]}
                  icon="wechat"
                  iconColor="#fff"
                  iconSize={18}
                  iconStyle={styles.iconStyle}
                  onPress={() =>
                    navigation.navigate('SingleChatScreen', {
                      chat_id: item.chat,
                    })
                  }
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RestaurantOrderDetailScreen;

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
    width: 80,
    height: 20,
    backgroundColor: '#009C22',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  vendor: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
    marginVertical: 10,
    paddingLeft: 18,
  },
  cancelBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0606',
    height: 32,
    marginTop: 6,
  },
  inBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: 32,
    marginTop: 6,
    marginRight: 10,
  },
  chatBtn: {
    width: '35%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingLeft: 0,
    paddingRight: 0,
    height: 34,
  },
  textStyle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal',
  },
  last: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    // marginRight: 40,
    // paddingRight: 10,
  },
};
