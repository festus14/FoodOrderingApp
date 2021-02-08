import React, {useState, useContext} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {styles} from './style';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {resetPassword} from '../../store/actions';

const PasswordResetScreen = ({navigation}) => {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);
  const [token, setToken] = useState({
    field: 'Token',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [password, setPassword] = useState({
    field: 'Password',
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

  const validateData = () => {
    let error = '';
    error = validate(token.value, token.validationRules, token.field);
    if (error) {
      return error;
    }
    error = validate(password.value, password.validationRules, password.field);
    return error;
  };

  const resetPasswordHandler = async () => {
    let error = validateData();
    if (error) {
      setError(error);
    } else {
      try {
        const authData = {
          token: token.value,
          password: password.value,
        };

        error = await dispatch(resetPassword(authData));
        if (error) {
          setError(error);
        } else {
          setSuccess('Password reset successful');
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
        title="Password Reset"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.codeText}>
              We have sent a token to your email
            </Text>
            <InputText
              placeholder="Required"
              title="Token"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={token.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setToken({...token, value: input})}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHT_GREY}
              title="Password"
              secureTextEntry
              value={password.value}
              inputStyle={styles.inputStyle}
              titleStyle={styles.titleStyle}
              containerStyle={styles.containerStyle}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setPassword({...password, value: input})}
              autoCapitalize="none"
              returnKeyTpe="go"
            />
            <MyButton
              text="Reset"
              style={styles.btn}
              isLoading={isLoading}
              onPress={resetPasswordHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PasswordResetScreen;
