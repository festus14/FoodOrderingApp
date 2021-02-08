import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Image} from 'react-native';
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
            <Text style={styles.account}>View account</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.views}>
            <View style={styles.icon}>
              <Text>Icon</Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Promotions</Text>
            </View>
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
    paddingVertical: 20,
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
};
