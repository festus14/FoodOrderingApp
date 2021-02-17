import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodContentItem from '../../components/FoodContentItem';
import MyButton from '../../components/MyButton';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundButton';
import {LIGHTER_GREY, SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utility/constants';
import {setCart, updateCart} from '../../store/actions';
import {Store} from '../../store';

const SingleFoodScreen = ({navigation, route}) => {
  const {
    state: {
      ui: {isCartLoading: isLoading},
      cart: {cart},
    },
    dispatch,
  } = useContext(Store);
  const goBack = () => navigation.goBack();
  const item = route.params.item;
  // console.log('item...', item);

  const [count, setCount] = useState(1);

  const incrementHandler = (isInc) => {
    if (isInc) {
      setCount(count + 1);
    } else {
      if (count !== 1) {
        setCount(count - 1);
      }
    }
  };

  const setCartHandler = async () => {
    const itemData = {
      id: item.id,
      name: item.name,
      price: item.price,
      count,
    };
    const oldItem = cart.filter((elem) => elem.id === itemData.id);
    if (oldItem.length > 0) {
      await dispatch(updateCart(itemData.id, itemData.count));
    } else {
      await dispatch(setCart(itemData));
    }
    goBack();
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title={item.name}
          onLeftPress={goBack}
          rightIcon={cart.length > 0 && 'ios-cart-outline'}
          onRightPress={() =>
            navigation.navigate('CheckoutModal', {title: 'Checkout'})
          }
        />

        <ScrollView>
          <View style={styles.infoImage}>
            <ImageBackground
              source={{uri: item.food_image}}
              resizeMode="stretch"
              style={styles.bImage}>
              <View style={styles.top}>
                <Icon
                  name="ios-radio-button-on-outline"
                  color={SECONDARY_COLOR}
                  size={22}
                />
                <Icon
                  name="ios-share-outline"
                  color={SECONDARY_COLOR}
                  size={22}
                />
              </View>
              <View style={styles.bottom}>
                <View style={styles.time}>
                  <Text>{item.preparation_time}mins</Text>
                </View>
                <Icon
                  name="ios-heart-outline"
                  color={SECONDARY_COLOR}
                  size={22}
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.body}>{item.description}</Text>
              <Text style={styles.price}>₦{item.price}</Text>
            </View>

            <Text style={styles.option}>Options</Text>

            <FoodContentItem />
            <FoodContentItem />
            <FoodContentItem />

            <View style={styles.total}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₦2250</Text>
            </View>

            <Text style={styles.option}>Special Instructions</Text>

            <Text style={styles.option}>
              No extra topping such as fresh leaves
            </Text>

            <View style={styles.increment}>
              <RoundButton text="-" onPress={() => incrementHandler()} />
              <Text style={styles.count}>{count}</Text>
              <RoundButton
                text="+"
                onPress={() => incrementHandler(true)}
                roundBtn={styles.roundBtn}
                textStyle={styles.textStyle}
              />
            </View>

            <MyButton
              text="Add to cart"
              style={styles.addStyle}
              onPress={setCartHandler}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SingleFoodScreen;

const styles = {
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 0,
    paddingBottom: 0,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
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
  content: {
    justifyContent: 'space-around',
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
  option: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 8,
    paddingVertical: 6,
    borderColor: LIGHTER_GREY,
  },
  total: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.84,
    height: SCREEN_HEIGHT * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 6,
    alignSelf: 'center',
    paddingRight: 7,
    paddingLeft: 17,
  },
  totalText: {
    color: SECONDARY_COLOR,
  },
  increment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  count: {
    paddingHorizontal: 15,
    fontSize: 25,
    fontWeight: '900',
  },
  roundBtn: {
    borderColor: SECONDARY_COLOR,
  },
  textStyle: {
    color: SECONDARY_COLOR,
  },
  addStyle: {
    marginBottom: 25,
    justifyContent: 'center',
  },
};
