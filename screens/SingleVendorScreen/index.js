import React, {useState} from 'react';
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

const SingleVendorScreen = ({navigation}) => {
  const [locale, setLocale] = useState('continental');

  const goBack = () => navigation.goBack();

  const view =
    locale === 'continental' ? (
      <FlatList
        data={DATA}
        renderItem={({item, index, separators}) => (
          <FoodItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        onRefresh={() => console.warn('Refreshed')}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <FlatList
        data={DATA_TWO}
        renderItem={({item, index, separators}) => (
          <FoodItem item={item} navigation={navigation} />
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
          leftIcon="ios-arrow-back"
          title="Urban Co."
          onLeftPress={goBack}
          rightIcon="ios-cart-outline"
          onRightPress={() =>
            navigation.navigate('CheckoutModal', {title: 'Checkout'})
          }
        />

        <View style={styles.infoImage}>
          <ImageBackground
            source={require('../../assets/images/launch-image.jpg')}
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
              <Text>110-130mins</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.container}>
          <View style={styles.infoHeader}>
            <Text style={{fontWeight: 'bold'}}>Urban.co, Festac</Text>
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
              <Text> Delivery fee N1500</Text>
            </View>
          </View>

          <View style={styles.topTabs}>
            <View
              style={[
                styles.topTab,
                locale === 'continental' && styles.activeTopTab,
              ]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setLocale('continental')}>
                <Text style={styles.topText}>CONTINENTAL</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.topTab,
                locale === 'traditional' && styles.activeTopTab,
              ]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setLocale('traditional')}>
                <Text style={styles.topText}>TRADITIONAL</Text>
              </TouchableOpacity>
            </View>
          </View>

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
