import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Store} from '../../store';
import {LIGHTER_GREY, SECONDARY_COLOR} from '../../utility/colors';
import {capitalize} from '../../utility/helpers';

const RestaurantAccountScreen = ({navigation}) => {
  const {
    state: {
      user: {user},
    },
    dispatch,
  } = useContext(Store);

  const names = user?.fullname?.split(' ') ?? [
    user?.firstname ?? ' ',
    user?.lastname ?? ' ',
  ];

  console.log(user);

  return (
    <>
      <Header title="Account" />

      <View style={styles.container}>
        <View style={styles.head}>
          <Image
            source={require('../../assets/images/burger.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.title}>
              {capitalize(names[0]) + ' ' + capitalize(names[1])}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantEditAccountScreen')
              }>
              <Text style={styles.account}>View account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('PromotionScreen')}>
          <View style={styles.icon}>
            <Icon name="md-pricetags-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Menu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('PromotionScreen')}>
          <View style={styles.icon}>
            <Icon name="md-pricetags-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Branches</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('PromotionScreen')}>
          <View style={styles.icon}>
            <Icon name="md-pricetags-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Restaurant Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('PromotionScreen')}>
          <View style={styles.icon}>
            <Icon name="md-pricetags-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Business Metrics</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('AboutScreen')}>
          <View style={styles.icon}>
            <Icon
              name="md-chatbox-ellipses-sharp"
              size={35}
              color={SECONDARY_COLOR}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>About</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('BecomeVendorScreen')}>
          <View style={styles.icon}>
            <Icon name="person-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Become a vendor</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RestaurantAccountScreen;

const styles = {
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  head: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  image: {
    height: 65,
    width: 65,
  },
  details: {
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    paddingBottom: 3,
  },
  account: {
    color: SECONDARY_COLOR,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 35,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
  },
  icon: {
    marginRight: 40,
    paddingVertical: 18,
    paddingLeft: 30,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
  },
  body: {flexDirection: 'row'},
  text: {fontSize: 18},
};
