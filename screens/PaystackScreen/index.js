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
import {
  getAllBanks,
  postOrder,
  resetCart,
  verifyAccount,
} from '../../store/actions';
import MyPicker from '../../components/MyPicker';
import RNPaystack from 'react-native-paystack';

const PaystackScreen = ({navigation, route}) => {
  const {total, deliveryMode} = route.params;
  const {
    state: {
      ui: {isLoading},
      user: {user},
      orders: {singleOrder},
    },
    dispatch,
  } = useContext(Store);

  const [cardNumber, setCardNumber] = useState({
    field: 'Card number',
    value: '',
    validationRules: {
      minLength: 16,
      maxLength: 16,
    },
  });

  // const [accountName, setAccountName] = useState({
  //   field: 'Card name',
  //   value: '',
  //   validationRules: {
  //     minLength: 2,
  //   },
  // });

  const [expDate, setExpDate] = useState({
    field: 'Expiry date',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [cvv, setCvv] = useState({
    field: 'CVV',
    value: '',
    validationRules: {
      minLength: 2,
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

  const [isResolved, setIsResolved] = useState(false);

  const [reference, setReference] = useState('');

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
      cardNumber.value,
      cardNumber.validationRules,
      cardNumber.field,
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

  const validateForm = () => {
    let error = '';
    error = validate(
      cardNumber.value,
      cardNumber.validationRules,
      cardNumber.field,
    );
    if (error) {
      return error;
    }
    error = validate(expDate.value, expDate.validationRules, expDate.field);
    if (error) {
      return error;
    }
    error = validate(cvv.value, cvv.validationRules, cvv.field);
    return error;
  };

  const verifyAccountHandler = async () => {
    let error = validateData();
    if (error) {
      setError(error);
    } else {
      try {
        const accntData = {
          number: cardNumber.value,
          code: selectedBank.value,
        };

        let res = await dispatch(verifyAccount(accntData));
        console.log(res);
        if (res.status) {
          Alert.alert(
            res.message,
            `${res.data.account_name} - ${res.data.account_number}`,
          );
          setAccountName({...accountName, value: res.data.account_name});
          setIsResolved(true);
        } else {
          setError(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const chargeCard = async () => {
    try {
      let res = await RNPaystack.chargeCard({
        cardNumber: '4123450131001381',
        // cardNumber: cardNumber.value,
        expiryMonth: expDate.value.slice(0, 2),
        expiryYear: expDate.value.slice(3),
        cvc: '883',
        // cvc: cvv.value,
        email: user.email,
        amountInKobo: total * 100,
      });

      console.log('Payment res', res.reference);
      setReference(res.reference);
      return null;
    } catch (error) {
      console.log('Error payment message', error.message);
      return error.message || 'Something went wrong, please try again';
    }
  };

  const [isPayLoading, setIsPayLoading] = useState(false);

  const makePayment = async () => {
    setIsPayLoading(true);
    let error = validateForm();
    if (error) {
      Alert.alert('Error', error);
    } else {
      error = await chargeCard();
      if (error) {
        Alert.alert('Error', error);
      } else {
        error = await dispatch(postOrder({deliveryMode, reference}));
        if (!error) {
          Alert.alert('Error', error);
          // navigation.navigate('OrderDetailsScreen', {item: singleOrder});
          navigation.navigate('OrdersStackNavigator');
        } else {
          Alert.alert('Success', 'Order has been made');
          navigation.navigate('OrdersStackNavigator');
          await dispatch(resetCart());
        }
      }
    }
    setIsPayLoading(false);
  };

  return (
    <>
      <Header leftIcon="ios-arrow-back" title="Paystack" onLeftPress={goBack} />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.label}>Card number</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={cardNumber.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => {
                setCardNumber({...cardNumber, value: input});
              }}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="number-pad"
              maxLength={16}
              minLength={16}
            />

            {/* <MyPicker
              labelText="Select bank"
              items={banks}
              setSelected={(value) => setSelectedBank({...selectedBank, value})}
              mode="dropdown"
            /> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Text style={styles.label}>Exp. Date</Text>
                <InputText
                  placeholder="01/20"
                  placeholderTextColor={LIGHT_GREY}
                  containerStyle={styles.containerStyle}
                  autoCorrect={false}
                  value={expDate.value}
                  onChangeText={(input) =>
                    setExpDate({...expDate, value: input})
                  }
                  onSubmitEditing={() => {}}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="phone-pad"
                  maxLength={5}
                />
              </View>

              <View style={{width: '45%'}}>
                <Text style={styles.label}>CVV</Text>
                <InputText
                  placeholder="123"
                  secureTextEntry
                  placeholderTextColor={LIGHT_GREY}
                  containerStyle={styles.containerStyle}
                  autoCorrect={false}
                  value={cvv.value}
                  onChangeText={(input) => setCvv({...cvv, value: input})}
                  onSubmitEditing={() => {}}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            {/* {isResolved && (
              <>
                <Text style={styles.label}>Card name</Text>
                <InputText
                  placeholder="Required"
                  placeholderTextColor={LIGHT_GREY}
                  containerStyle={styles.containerStyle}
                  autoCorrect={false}
                  value={accountName.value}
                  onSubmitEditing={() => {}}
                  autoCapitalize="none"
                  returnKeyType="next"
                  editable={false}
                  defaultValue={accountName.value}
                />
              </>
            )} */}
            <MyButton
              text={'Make payment'}
              style={styles.btn}
              isLoading={isPayLoading}
              onPress={makePayment}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PaystackScreen;
