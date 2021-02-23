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
import {LIGHTER_GREY, LIGHT_GREY, MAIN_COLOR} from '../../utility/colors';
import InputText from '../../components/InputText';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {signUp} from '../../store/actions';

export default function BecomeVendorScreen({navigation}) {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [authState, setAuthState] = useState('login');
  const [authError, setAuthError] = useState('');

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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon="ios-arrow-back"
        title="Become a Vendor"
        onLeftPress={goBack}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.form}>
          <Text style={styles.label}>Restaurant Name</Text>
          <InputText
            placeholder="Required"
            placeholderTextColor={LIGHTER_GREY}
            containerStyle={styles.containerStyle}
            autoCorrect={false}
            value={''}
            onSubmitEditing={() => {}}
            onChangeText={(input) => console.log('hello')}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={styles.label}>Email</Text>
          <InputText
            placeholder="Required"
            placeholderTextColor={LIGHTER_GREY}
            containerStyle={styles.containerStyle}
            autoCorrect={false}
            value={''}
            onSubmitEditing={() => {}}
            onChangeText={(input) => console.log('hello')}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <InputText
            secureTextEntry
            placeholder="Required"
            placeholderTextColor={LIGHTER_GREY}
            containerStyle={styles.containerStyle}
            autoCorrect={false}
            value={password.value}
            onSubmitEditing={() => {}}
            onChangeText={(input) => setPassword({...password, value: input})}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={styles.label}>Headquarters Address</Text>
          <InputText
            secureTextEntry
            placeholder="Required"
            placeholderTextColor={LIGHTER_GREY}
            containerStyle={styles.containerStyle}
            autoCorrect={false}
            value={password.value}
            onSubmitEditing={() => {}}
            onChangeText={(input) => setPassword({...password, value: input})}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={styles.label}>Contact Number</Text>
          <InputText
            placeholder="Required"
            placeholderTextColor={LIGHTER_GREY}
            containerStyle={styles.containerStyle}
            autoCorrect={false}
            value={''}
            onSubmitEditing={() => {}}
            onChangeText={(input) => console.log('hello')}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="phone-pad"
          />

          <MyButton
            text="Sign Up"
            style={styles.btn}
            isLoading={isLoading}
            onPress={() => console.log('Edited')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
