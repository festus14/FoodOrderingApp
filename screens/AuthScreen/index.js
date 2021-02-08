import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import MyButton from '../../components/MyButton';
import {styles} from './style';
import Header from '../../components/Header';
import {LIGHT_GREY, MAIN_COLOR} from '../../utility/colors';
import TopBar from '../../components/TopBar';
import InputText from '../../components/InputText';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {
  logIn,
  forgotPassword,
  signUp,
  resendVerifyToken,
} from '../../store/actions';

export default function AuthScreen({navigation}) {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [position, setPosition] = useState('left');
  const [authState, setAuthState] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authView, setAuthView] = useState('auth');

  const isLogin = authState === 'login';

  const [email, setEmail] = useState({
    field: 'Email',
    value: '',
    validationRules: {
      isEmail: true,
      minLength: 5,
    },
  });

  const [firstName, setFirstName] = useState({
    field: 'First name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [lastName, setLastName] = useState({
    field: 'Last name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [phoneNumber, setPhoneNumber] = useState({
    field: 'Phone number',
    value: '',
    validationRules: {
      minLength: 10,
    },
  });

  const [password, setPassword] = useState({
    field: 'Password',
    value: '',
    validationRules: {
      minLength: 8,
    },
  });

  const setPositionHandler = (pos) => {
    setPosition(pos);
    if (pos === 'left') {
      setAuthState('login');
    } else {
      setAuthState('signup');
    }
  };

  const validateLoginUser = () => {
    let error = '';
    error = validate(email.value, email.validationRules, email.field);
    if (error) {
      return error;
    }
    error = validate(password.value, password.validationRules, password.field);
    return error;
  };

  const loginHandler = async () => {
    let error = validateLoginUser();
    if (error) {
      setError(error);
    } else {
      try {
        const authData = {
          email: email.value.toLowerCase(),
          password: password.value,
        };

        error = await dispatch(logIn(authData));
        if (error) {
          setError(error);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const validateUser = () => {
    let error = '';
    error = validate(
      firstName.value,
      firstName.validationRules,
      firstName.field,
    );
    if (error) {
      return error;
    }
    error = validate(lastName.value, lastName.validationRules, lastName.field);
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
    if (error) {
      return error;
    }
    error = validate(password.value, password.validationRules, password.field);
    return error;
  };

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

  const signUpHandler = async () => {
    let error = validateUser();
    if (error) {
      setError(error);
    } else {
      try {
        const authData = {
          email: email.value.toLowerCase(),
          firstName: firstName.value.toLowerCase(),
          lastName: lastName.value.toLowerCase(),
          phoneNumber: phoneNumber.value,
          password: password.value,
        };

        error = await dispatch(signUp(authData));
        if (error) {
          setError(error);
        } else {
          setSuccess('Sign up successful');
          navigation.navigate('VerificationScreen');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resendTokenHandler = async () => {
    let error = validate(email.value, email.validationRules, email.field);
    if (error) {
      setError(error);
    } else {
      try {
        error = await dispatch(resendVerifyToken(email.value.toLowerCase()));
        if (error) {
          setError(error);
        } else {
          setSuccess('A token has been successfully sent to your mail');
          navigation.navigate('VerificationScreen');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const forgotHandler = async () => {
    let error = validate(email.value, email.validationRules, email.field);
    if (error) {
      setError(error);
    } else {
      try {
        error = await dispatch(forgotPassword(email.value.toLowerCase()));
        if (error) {
          setError(error);
        } else {
          setSuccess('Reset Password has been successfully sent to your mail');
          // setAuthView('auth');
          navigation.navigate('PasswordResetScreen');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      {authView === 'auth' ? (
        <Header
          style={styles.header}
          leftIcon="ios-arrow-back"
          leftColor={MAIN_COLOR}
          size={24}
          onLeftPress={() => goBack()}
          component={
            <TopBar
              style={styles.topBar}
              tabBtn={styles.tabBtn}
              leftText="Sign In"
              rightText="Sign Up"
              position={position}
              setLeftPosition={setPositionHandler}
              setRightPosition={setPositionHandler}
            />
          }
        />
      ) : (
        <Header
          leftIcon="ios-arrow-back"
          title={authView === 'forgot' ? 'Password Reset' : 'Resend Token'}
          onLeftPress={() => setAuthView('auth')}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={styles.form}>
            {authView !== 'auth' ? (
              <>
                <Text style={styles.codeText}>Please enter user email</Text>
                <InputText
                  placeholder="Required"
                  placeholderTextColor={LIGHT_GREY}
                  title="Email"
                  autoCorrect={false}
                  value={email.value}
                  inputStyle={styles.inputStyle}
                  onSubmitEditing={() => {}}
                  onChangeText={(input) => setEmail({...email, value: input})}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="email-address"
                />
                {authView === 'forgot' ? (
                  <MyButton
                    text="Send Token"
                    style={styles.btn}
                    isLoading={isLoading}
                    onPress={forgotHandler}
                  />
                ) : (
                  <MyButton
                    text="Resend Token"
                    style={styles.btn}
                    isLoading={isLoading}
                    onPress={resendTokenHandler}
                  />
                )}
              </>
            ) : (
              <>
                {!isLogin && (
                  <>
                    <InputText
                      placeholder="Required"
                      placeholderTextColor={LIGHT_GREY}
                      title="First Name"
                      autoCorrect={false}
                      value={firstName.value}
                      inputStyle={styles.inputStyle}
                      onSubmitEditing={() => {}}
                      onChangeText={(input) =>
                        setFirstName({...firstName, value: input})
                      }
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                    <InputText
                      placeholder="Required"
                      placeholderTextColor={LIGHT_GREY}
                      title="Last Name"
                      autoCorrect={false}
                      value={lastName.value}
                      inputStyle={styles.inputStyle}
                      onSubmitEditing={() => {}}
                      onChangeText={(input) =>
                        setLastName({...lastName, value: input})
                      }
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                  </>
                )}
                <InputText
                  placeholder="Required"
                  placeholderTextColor={LIGHT_GREY}
                  title="Email"
                  autoCorrect={false}
                  value={email.value}
                  inputStyle={styles.inputStyle}
                  onSubmitEditing={() => {}}
                  onChangeText={(input) => setEmail({...email, value: input})}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="email-address"
                />
                {!isLogin && (
                  <InputText
                    placeholder="Required"
                    placeholderTextColor={LIGHT_GREY}
                    title="Phone"
                    autoCorrect={false}
                    value={phoneNumber.value}
                    inputStyle={styles.inputStyle}
                    onSubmitEditing={() => {}}
                    onChangeText={(input) =>
                      setPhoneNumber({...phoneNumber, value: input})
                    }
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="number-pad"
                  />
                )}
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
                  onChangeText={(input) =>
                    setPassword({...password, value: input})
                  }
                  autoCapitalize="none"
                  returnKeyTpe="go"
                />
                <MyButton
                  text={isLogin ? 'Sign In' : 'Sign Up'}
                  style={styles.btn}
                  isLoading={isLoading}
                  onPress={isLogin ? loginHandler : signUpHandler}
                />
                {isLogin ? (
                  <TouchableOpacity
                    onPress={() => {
                      setAuthView('forgot');
                    }}
                    style={styles.forgot}>
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setAuthView('verify');
                    }}
                    style={styles.forgot}>
                    <Text style={styles.forgotText}>
                      Resend verification token?
                    </Text>
                  </TouchableOpacity>
                )}
                {!isLogin && (
                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                      By clicking Sign Up, Continue with Facebook, Continue with
                      Google, you agree to our{' '}
                      <Text style={styles.styledText}>
                        Terms and Conditions
                      </Text>{' '}
                      and
                      <Text style={styles.styledText}> Privacy Statement</Text>
                    </Text>
                  </View>
                )}
                <View style={styles.oauthContainer}>
                  <MyButton
                    text="Continue with Facebook"
                    style={{...styles.oauthBtn, backgroundColor: '#3B5998'}}
                    icon={'facebook'}
                    iconStyle={styles.iconStyle}
                    onPress={() => console.warn('faceboook')}
                  />
                  <MyButton
                    text="Continue with Google"
                    style={{...styles.oauthBtn, backgroundColor: '#4285F4'}}
                    icon={'google'}
                    iconStyle={styles.iconStyle}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
