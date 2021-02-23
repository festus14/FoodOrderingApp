import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHTER_GREY, LIGHT_GREY, SECONDARY_COLOR} from '../../utility/colors';

const AccountScreen = ({navigation}) => {
  const [code, setCode] = useState({
    field: 'Code',
    value: '',
    validationRules: {
      minLength: 4,
    },
  });

  const goBack = () => navigation.goBack();

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
            <Text style={styles.title}>Presh Presh</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAccountScreen')}>
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
            <Text style={styles.text}>Promotions</Text>
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

        <View style={styles.body}>
          <View style={styles.icon}>
            <Icon name="md-bicycle-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Driver's page</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default AccountScreen;

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
