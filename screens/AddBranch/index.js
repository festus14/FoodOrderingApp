/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import MyButton from '../../components/MyButton';
import {styles} from './style';
import Header from '../../components/Header';
import {LIGHTER_GREY} from '../../utility/colors';
import InputText from '../../components/InputText';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {resetApp, getAllBanks, signUpVendor} from '../../store/actions';
import MyPicker from '../../components/MyPicker';
import DateTimePicker from '../../components/DateTimePicker';
import {getTime, isEmpty} from '../../utility/helpers';
import MyMultiplePicker from '../../components/MyMultiplePicker';
import VirtualizedView from '../../components/VirtualizedView';

export default function BecomeVendorScreen({navigation}) {
  const {
    state: {
      ui: {isUserLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [authError, setAuthError] = useState('');

  const [email, setEmail] = useState({
    field: 'Email',
    value: '',
    validationRules: {
      isEmail: true,
      minLength: 5,
    },
  });

  const [restaurantName, setRestaurantName] = useState({
    field: 'First name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [userName, setUserName] = useState({
    field: 'User name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [accountName, setAccountName] = useState({
    field: 'Account name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [contactNumber, setContactNumber] = useState({
    field: 'Contact number',
    value: '',
    validationRules: {
      minLength: 10,
    },
  });

  const [accountNumber, setAccountNumber] = useState({
    field: 'Account number',
    value: '',
    validationRules: {
      minLength: 10,
      maxLength: 10,
    },
  });

  const [address, setAddress] = useState({
    field: 'Address',
    value: '',
    validationRules: {
      minLength: 3,
    },
  });

  const validateUser = (daysOpen) => {
    let error = '';
    error = validate(
      restaurantName.value,
      restaurantName.validationRules,
      restaurantName.field,
    );
    if (error) {
      return error;
    }
    error = validate(
      accountName.value,
      accountName.validationRules,
      accountName.field,
    );
    if (error) {
      return error;
    }
    error = validate(
      accountNumber.value,
      accountNumber.validationRules,
      accountNumber.field,
    );
    if (error) {
      return error;
    }
    error = validate(userName.value, userName.validationRules, userName.field);
    if (error) {
      return error;
    }
    error = validate(email.value, email.validationRules, email.field);
    if (error) {
      return error;
    }
    error = validate(address.value, address.validationRules, address.field);
    if (error) {
      return error;
    }
    error = validate(
      contactNumber.value,
      contactNumber.validationRules,
      contactNumber.field,
    );
    if (error) {
      return error;
    }
    error = validate(
      selectedBank.value,
      selectedBank.validationRules,
      selectedBank.field,
    );
    if (error) {
      return error;
    }
    if (isEmpty(daysOpen)) {
      error = 'Days open field must contain at least one day';
    }
    if (isEmpty(openingTime)) {
      error = 'Opening time field is required';
    }
    if (isEmpty(closingTime)) {
      error = 'Closing time field is required';
    }
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

  const createBranchHandler = async () => {
    const daysOpen = [];

    for (let i = 0; i < selectedItems.length; i++) {
      const day = selectedItems[i];

      switch (day) {
        case 'mon':
          daysOpen.push('0');
          break;
        case 'tue':
          daysOpen.push('1');
          break;
        case 'wed':
          daysOpen.push('2');
          break;
        case 'thu':
          daysOpen.push('3');
          break;
        case 'fri':
          daysOpen.push('4');
          break;
        case 'sat':
          daysOpen.push('5');
          break;
        case 'sun':
          daysOpen.push('6');
          break;

        default:
          break;
      }
    }

    let error = validateUser(daysOpen);
    if (error) {
      setError(error);
    } else {
      try {
        const authData = {
          email: email.value.toLowerCase(),
          restaurant_name: restaurantName.value.toLowerCase(),
          phone_number: contactNumber.value,
          address: address.value,
          day_of_week_available: daysOpen,
          username: userName.value,
          account_number: accountNumber.value,
          account_name: accountName.value,
          bank_name: selectedBank.value,
          opening_hours: openingTime,
          closing_hours: closingTime,
          is_headquarter: false,
        };

        error = await dispatch(signUpVendor(authData));
        if (error) {
          setError(error);
        } else {
          setSuccess('You have successfully created a branch');
          goBack();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

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

  const items = [
    {
      id: 'mon',
      name: 'Monday',
    },
    {
      id: 'tue',
      name: 'Tuesday',
    },
    {
      id: 'wed',
      name: 'Wednesday',
    },
    {
      id: 'thu',
      name: 'Thursday',
    },
    {
      id: 'fri',
      name: 'Friday',
    },
    {
      id: 'sat',
      name: 'Saturday',
    },
    {
      id: 'sun',
      name: 'Sunday',
    },
  ];

  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [timeType, setTimeType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selected) => {
    setSelectedItems(selected);
  };

  const saveTimeHandler = async () => {
    if (timeType === 'closing') {
      setClosingTime(getTime(date));
    } else {
      setOpeningTime(getTime(date));
    }
    setModalVisible(false);
  };

  const setDateHandler = (newDate) => {
    setDate(newDate);
  };

  const setModalVisibleHandler = (closing) => {
    if (closing) {
      setTimeType('closing');
    } else {
      setTimeType('opening');
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftIcon="ios-arrow-back"
        title="Become a Vendor"
        onLeftPress={goBack}
      />

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="time"
                date={date}
                onSetDate={setDateHandler}
              />
              <MyButton
                style={styles.modalBtn}
                text="Save"
                textStyle={styles.modalText}
                onPress={saveTimeHandler}
              />
            </View>
          </View>
        </Modal>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <VirtualizedView showsVerticalScrollIndicator={false}>
          <Text style={styles.cardTitle}>Vendor Details</Text>
          <View style={styles.cardBody}>
            <Text style={styles.label}>Restaurant Name</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={restaurantName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setRestaurantName({...restaurantName, value: input})
              }
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Text style={styles.label}>Username</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={userName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setUserName({...userName, value: input})}
              autoCapitalize="none"
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

            <Text style={styles.label}> Headquarter Address</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={address.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setAddress({...address, value: input})}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Text style={styles.label}>Contact Number</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={contactNumber.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setContactNumber({...contactNumber, value: input})
              }
              autoCapitalize="none"
              returnKeyType="go"
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.cardTitle}>Bank Details</Text>
          <View style={styles.cardBody}>
            <Text style={styles.label}>Account Name</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={accountName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setAccountName({...accountName, value: input})
              }
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Text style={styles.label}>Account Number</Text>
            <InputText
              placeholder="Required"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={accountNumber.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setAccountNumber({...accountNumber, value: input})
              }
              autoCapitalize="none"
              returnKeyType="go"
              keyboardType="phone-pad"
            />

            <MyPicker
              labelText="Select bank"
              items={banks}
              setSelected={(value) => setSelectedBank({...selectedBank, value})}
              mode="dropdown"
              labelStyle={styles.label}
              picker={{height: 30}}
              valueKey="name"
            />
          </View>

          <Text style={styles.cardTitle}>Other Details</Text>
          <View style={styles.cardBody}>
            <Text style={styles.label}>Days Open in Week</Text>
            <MyMultiplePicker
              items={items}
              selectedItems={selectedItems}
              onSelectedItemsChange={onSelectedItemsChange}
            />

            <View style={styles.hours}>
              <View style={styles.times}>
                <Text style={styles.label}>Opening Time</Text>
                <TouchableOpacity
                  onPress={() => setModalVisibleHandler()}
                  style={styles.timeStyle}>
                  <Text style={styles.timeText}>{openingTime}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.times}>
                <Text style={styles.label}>Closing Time</Text>
                <TouchableOpacity
                  onPress={() => setModalVisibleHandler('closing')}
                  style={styles.timeStyle}>
                  <Text style={styles.timeText}>{closingTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <MyButton
            text="Create Branch"
            style={styles.btn}
            isLoading={isLoading}
            onPress={createBranchHandler}
          />
        </VirtualizedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
