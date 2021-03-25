import React, {useContext, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {Store} from '../../store';
import {generateCode} from '../../store/actions';
import {LIGHT_GREY} from '../../utility/colors';
import {validate} from '../../utility/validation';
import {styles} from './style';

const PromotionScreen = ({navigation}) => {
  const {
    state: {
      ui: {isPromoLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [email, setEmail] = useState({
    field: 'Email',
    value: '',
    validationRules: {
      isEmail: true,
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

  const generateCodeHandler = async () => {
    let error = validate(email.value, email.validationRules, email.field);
    if (error) {
      setError(error);
    } else {
      try {
        error = await dispatch(generateCode(email.value.toLowerCase()));
        if (error) {
          setError(error);
        } else {
          setSuccess(
            'You have successfully generated a code from this referral',
          );
          goBack();
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
        title="Promotions"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <InputText
              placeholder="Enter referral email"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={email.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setEmail({...email, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
              keyboardType="email-address"
            />
            <Text style={styles.codeText}>Get your first promotion</Text>
            <MyButton
              text="Apply"
              style={styles.btn}
              isLoading={isLoading}
              onPress={generateCodeHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PromotionScreen;
