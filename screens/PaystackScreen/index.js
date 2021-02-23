/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {styles} from './style';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {getAllBanks, verifyAccount} from '../../store/actions';
import MyPicker from '../../components/MyPicker';

const PaystackScreen = ({navigation}) => {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);
  const [accountNumber, setAccountNumber] = useState({
    field: 'Account number',
    value: '',
    validationRules: {
      minLength: 10,
      maxLength: 10,
    },
  });

  const [selectedBank, setSelectedBank] = useState({
    field: 'Bank',
    value: '',
    validationRules: {
      minLength: 1,
    },
  });

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchAllBanks = async () => {
      let allBanks = await dispatch(getAllBanks());
      if (allBanks.length > 0) {
        setBanks(allBanks);
      } else {
        setError('Could not fetch all banks');
      }
    };

    fetchAllBanks();
  }, []);

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
    error = validate(
      accountNumber.value,
      accountNumber.validationRules,
      accountNumber.field,
    );
    if (error) {
      return error;
    }
    error = validate(
      selectedBank.value,
      selectedBank.validationRules,
      selectedBank.field,
    );
    return error;
  };

  const verifyAccountHandler = async () => {
    let error = validateData();
    if (error) {
      setError(error);
    } else {
      try {
        const accntData = {
          number: accountNumber.value,
          code: selectedBank.value,
        };

        let res = await dispatch(verifyAccount(accntData));
        console.log(res);
        if (res.status) {
          Alert.alert(
            res.message,
            `${res.data.account_name} - ${res.data.account_number}`,
          );
        } else {
          setError(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Header leftIcon="ios-arrow-back" title="Paystack" onLeftPress={goBack} />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.label}>Account number</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={accountNumber.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setAccountNumber({...accountNumber, value: input})
              }
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="number-pad"
            />
            <MyPicker
              labelText="Select bank"
              items={banks}
              setSelected={(value) => setSelectedBank({...selectedBank, value})}
              mode="dropdown"
            />
            <MyButton
              text="Verify Account"
              style={styles.btn}
              isLoading={isLoading}
              onPress={verifyAccountHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PaystackScreen;
