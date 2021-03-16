import React, {useContext, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {Store} from '../../store';
import {LIGHT_GREY} from '../../utility/colors';
import {validate} from '../../utility/validation';
import {verifyUser} from '../../store/actions';
import {styles} from './style';

const VerificationScreen = ({navigation}) => {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [code, setCode] = useState({
    field: 'Code',
    value: '',
    validationRules: {
      minLength: 4,
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

  const verifyHandler = async () => {
    let error = validate(code.value, code.validationRules, code.field);
    if (error) {
      setError(error);
    } else {
      try {
        error = await dispatch(verifyUser(code.value));
        if (!error) {
          setError('Token not valid');
        } else {
          setSuccess('Verification successful');
          navigation.navigate('AuthScreen');
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
        title="Enter OTP"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.codeText}>
              We have sent a verification code to your email
            </Text>
            <InputText
              placeholder="Enter verification code"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={code.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setCode({...code, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <MyButton
              text="Verify"
              isLoading={isLoading}
              style={styles.btn}
              onPress={verifyHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default VerificationScreen;
