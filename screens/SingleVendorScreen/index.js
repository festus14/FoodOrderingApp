/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodItem from '../../components/FoodItem';
import Header from '../../components/Header';
import {SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {getVendorMenus} from '../../store/actions';

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

const SCROLL_DATA = [
  {
    id: '1',
    name: 'CONTINENTAL',
  },
  {
    id: '2',
    name: 'TRADITIONAL',
  },
  {
    id: '3',
    name: 'SEA FOOD',
  },
];

const SingleVendorScreen = ({navigation, route}) => {
  const [vendor, extraInfo] = route.params.item;
  const {
    state: {
      ui: {isVendorsLoading: isLoading},
      vendors: {vendorMenus},
    },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    const fetchMenus = async () => {
      let error = await dispatch(getVendorMenus(vendor.restaurant.id));
    };

    fetchMenus();
    return () => {};
  }, []);
  const [locale, setLocale] = useState('continental');
  const [menu, setMenu] = useState([]);

  const goBack = () => navigation.goBack();

  const view = (
    <FlatList
      data={menu}
      renderItem={({item, index, separators}) => (
        <FoodItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshing={false}
      onRefresh={() => console.warn('Refreshed')}
      showsVerticalScrollIndicator={false}
    />
  );

  const setLocaleHandler = (name, currentMenu) => {
    setLocale(name);
    setMenu(currentMenu);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title={vendor.restaurant.firstname}
          onLeftPress={goBack}
          rightIcon="ios-cart-outline"
          onRightPress={() =>
            navigation.navigate('CheckoutModal', {title: 'Checkout'})
          }
        />

        <View style={styles.infoImage}>
          <ImageBackground
            source={{uri: vendor.restaurant.image}}
            resizeMode="stretch"
            style={styles.bImage}>
            <View style={styles.top}>
              <Icon
                name="ios-radio-button-on-outline"
                color={SECONDARY_COLOR}
                size={22}
              />
              <Icon
                name="ios-information-circle-sharp"
                color={SECONDARY_COLOR}
                size={22}
              />
            </View>
            <View style={styles.bottom}>
              <Text>
                {extraInfo.additional_info.delivery_time.slice(0, -4)}s
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.container}>
          <View style={styles.infoHeader}>
            <Text style={{fontWeight: 'bold'}}>
              {vendor.restaurant.firstname}
            </Text>
            <View style={styles.rating}>
              <Icon
                name="star-half-outline"
                color={SECONDARY_COLOR}
                size={15}
              />
              <Text> 3.5 </Text>
              <View style={{justifyContent: 'center'}}>
                <Icon name="ellipse" color="#000" size={6} />
              </View>
              <Text style={{color: SECONDARY_COLOR}}> ## </Text>
              <View style={{justifyContent: 'center'}}>
                <Icon name="ellipse" color="#000" size={6} />
              </View>
              <Text> {extraInfo.additional_info.delivery_fee}</Text>
            </View>
          </View>

          <FlatList
            data={vendorMenus}
            renderItem={({item, index, separators}) => (
              <View
                style={[
                  styles.topTab,
                  locale === item.name && styles.activeTopTab,
                ]}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setLocaleHandler(item.name, item.menu)}>
                  <Text style={styles.topText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshing={false}
            onRefresh={() => console.warn('Refreshed')}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          {view}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SingleVendorScreen;

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
  infoHeader: {
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  topTab: {
    color: '#fff',
    justifyContent: 'flex-end',
    marginBottom: 30,
    height: 20,
    // backgroundColor: '#3f2',
    alignItems: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 12,
  },
  activeTopTab: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
  },
  topText: {
    justifyContent: 'center',
    fontWeight: '100',
    fontSize: 16,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
};
