import React, {useState, useContext} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {
  ALMOST_BLACK,
  LIGHTER_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
} from '../../utility/colors';
import {styles} from './style';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {resetPassword} from '../../store/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyPicker from '../../components/MyPicker';

const AddMenuModal = ({navigation}) => {
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

  const [dishName, setDishName] = useState({
    field: 'Dish name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [price, setPrice] = useState({
    field: 'Price',
    value: '',
    validationRules: {
      minLength: 1,
    },
  });

  const [description, setDescription] = useState({
    field: 'Description',
    value: '',
    validationRules: {},
  });

  const [selectedCategory, setSelectedCategory] = useState({
    field: 'Category',
    value: '',
    validationRules: {
      minLength: 1,
    },
  });

  const [categories, setCategories] = useState([
    {id: 1, name: 'Traditional', code: 'traditional'},
    {id: 2, name: 'Continental', code: 'continental'},
  ]);

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
        title="Add to Menu"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <View style={styles.imageView}>
              <TouchableOpacity style={styles.imageBtn}>
                <Text> + </Text>
              </TouchableOpacity>
              <Text style={styles.dishText}>Dish image</Text>
            </View>

            <InputText
              placeholder="Dish name"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={dishName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setDishName({...dishName, value: input})}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <View style={styles.priceRow}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Price</Text>
                <InputText
                  placeholder=""
                  placeholderTextColor={LIGHT_GREY}
                  title="#"
                  autoCorrect={false}
                  value={price.value}
                  containerStyle={styles.priceStyle}
                  inputStyle={styles.inputStyle}
                  titleStyle={styles.titleStyle}
                  onSubmitEditing={() => {}}
                  onChangeText={(input) => setPrice({...price, value: input})}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.priceTitle}>Category</Text>
                <MyPicker
                  items={categories}
                  setSelected={(value) =>
                    setSelectedCategory({...selectedCategory, value})
                  }
                  // mode="dropdown"
                  pickerStyle={styles.pickerStyle}
                  picker={styles.picker}
                />
              </View>
            </View>

            <Text style={styles.priceTitle}>Description</Text>
            <InputText
              placeholder=""
              placeholderTextColor={LIGHT_GREY}
              autoCorrect={false}
              value={description.value}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputStyle}
              titleStyle={{paddingHorizontal: 0}}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setDescription({...description, value: input})
              }
              multiline
              numberOfLines={2}
              maxLength={50}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <View style={styles.priceRow}>
              <Text>Variant</Text>

              <MyButton
                style={styles.chatBtn}
                text="Add variant"
                textStyle={styles.varStyle}
                icon="plus"
                iconColor="#fff"
                iconSize={18}
                iconStyle={styles.iconStyle}
                onPress={() => {}}
              />
            </View>

            <View style={styles.variant}>
              <View style={styles.varBox}></View>

              {/* <View style={styles.clear}>
                <MyButton
                  style={styles.clearBtn}
                  textStyle={styles.clearStyle}
                  rightIcon="trash"
                  iconColor={ALMOST_BLACK}
                  iconSize={15}
                  onPress={() => {}}
                />
              </View> */}
            </View>

            <MyButton
              text="Add to Menu"
              style={styles.btnStyle}
              textStyle={styles.textStyle}
              icon="plus"
              onPress={() => {}}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default AddMenuModal;
