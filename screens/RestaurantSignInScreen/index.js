import React, {useContext, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {Store} from '../../store';
import {LIGHT_GREY} from '../../utility/colors';
import {validate} from '../../utility/validation';
import {restaurantSignIn} from '../../store/actions';
import {styles} from './style';
import {trimString} from '../../utility/helpers';

const RestaurantSignInScreen = ({navigation}) => {
  const {
    state: {
      ui: {isUserLoading: isLoading},
      user: {user},
    },
    dispatch,
  } = useContext(Store);

  const [username, setUsername] = useState({
    field: 'Username',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });
  const [authError, setAuthError] = useState('');

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

  const goBack = () => navigation.goBack();

  const sgnInRestaurantHandler = async () => {
    let error = validate(
      username.value,
      username.validationRules,
      username.field,
    );
    if (error) {
      setError(error);
    } else {
      try {
        error = await dispatch(restaurantSignIn({username: username.value}));
        if (error) {
          setError(error);
        } else {
          navigation.navigate('RestaurantBottomNavigator');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title={trimString(user?.firstname ?? '', 35)}
        onLeftPress={goBack}
        textStyle={{textTransform: 'capitalize'}}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.codeText}>Enter restaurant username</Text>
            <InputText
              placeholder="Username"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={username.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setUsername({...username, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <MyButton
              text="Fetch Orders"
              isLoading={isLoading}
              style={styles.btn}
              onPress={sgnInRestaurantHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default RestaurantSignInScreen;
