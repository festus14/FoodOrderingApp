import React, {useContext, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {Store} from '../../store';
import {LIGHTER_GREY, MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {validate} from '../../utility/validation';
import {updateUser, changePassword} from '../../store/actions';
import {capitalize} from '../../utility/helpers';

const RestaurantEditAccountScreen = ({navigation}) => {
  const {
    state: {
      ui: {isUserLoading: isLoading},
      user: {user},
    },
    dispatch,
  } = useContext(Store);

  const names = user?.fullname?.split(' ') ?? [
    user?.firstname ?? ' ',
    user?.lastname ?? ' ',
  ];

  const [email, setEmail] = useState({
    field: 'Email',
    value: user.email,
    validationRules: {
      isEmail: true,
      minLength: 5,
    },
  });

  const [restaurantName, setRestuarantName] = useState({
    field: 'Restaurant name',
    value: capitalize(names[0]),
    validationRules: {
      minLength: 2,
    },
  });

  const [phoneNumber, setPhoneNumber] = useState({
    field: 'Phone number',
    value: user.phone,
    validationRules: {
      minLength: 10,
    },
  });

  const [password, setPassword] = useState({
    field: 'Password',
    value: '',
    validationRules: {
      minLength: 4,
    },
  });

  const [newPassword, setNewPassword] = useState({
    field: 'New password',
    value: '',
    validationRules: {
      minLength: 8,
    },
  });

  const [authError, setAuthError] = useState('');

  const goBack = () => navigation.goBack();

  const setError = (error) => {
    setAuthError(error);
    Alert.alert('Error', error);

    setTimeout(() => {
      setAuthError('');
    }, 5000);
  };

  const setSuccess = (message) => {
    setAuthError(message);
    Alert.alert('Success', message);

    setTimeout(() => {
      setAuthError('');
    }, 5000);
  };

  const validateUser = () => {
    let error = '';
    error = validate(
      restaurantName.value,
      restaurantName.validationRules,
      restaurantName.field,
    );
    if (error) {
      return error;
    }
    error = validate(email.value, email.validationRules, email.field);
    if (error) {
      return error;
    }
    error = validate(
      phoneNumber.value,
      phoneNumber.validationRules,
      phoneNumber.field,
    );
    return error;
  };

  const editUserHandler = async () => {
    let error = validateUser();
    if (error) {
      setError(error);
    } else {
      try {
        const userData = {
          email: email.value.toLowerCase(),
          firstname: restaurantName.value.toLowerCase(),
          phone: phoneNumber.value,
        };

        error = await dispatch(updateUser(userData));
        if (error) {
          setError(error);
        } else {
          setSuccess('User has being updated');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const validatePassword = () => {
    let error = validate(
      password.value,
      password.validationRules,
      password.field,
    );
    if (error) {
      return error;
    }
    error = validate(
      newPassword.value,
      newPassword.validationRules,
      newPassword.field,
    );
    return error;
  };

  const changePasswordHandler = async () => {
    if (password.value.length > 4 && newPassword.value > 4) {
      let error = validatePassword();
      if (error) {
        setAuthError(error);
      } else {
        error = await dispatch(changePassword({password: newPassword}));
      }
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title="Edit Account"
          onLeftPress={goBack}
        />

        <ScrollView style={styles.container}>
          <Text style={styles.orderTitle}>Personal Details</Text>
          <View style={styles.orderInfo}>
            <Text style={styles.label}>Restaurant Name</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={restaurantName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setRestuarantName({...restaurantName, value: input})
              }
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>Email</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={email.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setEmail({...email, value: input})}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Phone</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={phoneNumber.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setPhoneNumber({...phoneNumber, value: input})
              }
              autoCapitalize="none"
              returnKeyType="go"
              keyboardType="phone-pad"
            />

            <MyButton
              text="Save"
              style={styles.btn}
              isLoading={isLoading}
              onPress={editUserHandler}
            />
          </View>

          <Text style={styles.orderTitle}>Change Password</Text>

          <View style={styles.orderInfo}>
            <InputText
              secureTextEntry={true}
              placeholder="Current Password"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={password.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setPassword({...password, value: input})}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <InputText
              secureTextEntry={true}
              placeholder="New Password"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={newPassword.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setNewPassword({...newPassword, value: input})
              }
              autoCapitalize="none"
              returnKeyType="go"
            />

            <MyButton
              text="Change Password"
              style={styles.btn}
              isLoading={isLoading}
              onPress={changePasswordHandler}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RestaurantEditAccountScreen;

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
    width: 70,
    height: 18,
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
    fontSize: 15,
    marginVertical: 10,
    paddingLeft: 18,
    color: MAIN_COLOR,
  },
  cancelBtn: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0606',
    height: 32,
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  chatBtn: {
    width: '32%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingLeft: 12,
    paddingRight: 8,
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
    paddingRight: 10,
  },
  label: {
    // marginTop: 30,
    fontSize: 12,
  },
  containerStyle: {
    marginBottom: 30,
  },
  btn: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'center',
  },
};
