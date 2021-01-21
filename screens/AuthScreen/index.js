import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MyButton from '../../components/MyButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {styles} from './style';
import Header from '../../components/Header';
import {LIGHT_GREY, MAIN_COLOR} from '../../utility/colors';
import TopBar from '../../components/TopBar';
import InputText from '../../components/InputText';

export default function AuthScreen({navigation}) {
  const [position, setPosition] = useState('left');
  const [authState, setAuthState] = useState('login');

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
    field: 'FirstName',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [lastName, setLastName] = useState({
    field: 'LastName',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [phoneNumber, setPhoneNumber] = useState({
    field: 'PhoneNumber',
    value: '',
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

  const setPositionHandler = (pos) => {
    setPosition(pos);
    pos === 'left' ? setAuthState('login') : setAuthState('false');
  };

  const loginHandler = () => {
    navigation.navigate('VerificationScreen');
  };

  const signUpHandler = () => {
    navigation.navigate('VerificationScreen');
  };

  return (
    <>
      <Header
        style={styles.header}
        leftIcon="arrow-right"
        leftColor={MAIN_COLOR}
        size={24}
        component={
          <TopBar
            style={styles.topBar}
            tabBtn={styles.tabBtn}
            leftText="Sign In"
            rightText="Sign Up"
            position={position}
            setLeftPosition={() => setPositionHandler('left')}
            setRightPosition={() => setPositionHandler('right')}
          />
        }
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{height: SCREEN_HEIGHT}}>
              <View style={styles.form}>
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
                  onPress={() => (isLogin ? loginHandler() : signUpHandler())}
                />
                {isLogin ? (
                  <TouchableOpacity onPress={() => {}} style={styles.forgot}>
                    <Text style={styles.forgotText}>{'Forgot Password?'}</Text>
                  </TouchableOpacity>
                ) : (
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
                  />
                  <MyButton
                    text="Continue with Google"
                    style={{...styles.oauthBtn, backgroundColor: '#4285F4'}}
                    icon={'google'}
                    iconStyle={styles.iconStyle}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
}
