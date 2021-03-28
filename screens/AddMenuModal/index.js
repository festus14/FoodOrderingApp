import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {
  ALMOST_BLACK,
  GREY,
  LIGHTER_GREY,
  LIGHT_GREY,
} from '../../utility/colors';
import {styles} from './style';
import {validate} from '../../utility/validation';
import {Store} from '../../store';
import {addMenu, resetPassword} from '../../store/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyPicker from '../../components/MyPicker';
import {getTime, isEmpty} from '../../utility/helpers';
import DateTimePicker from '../../components/DateTimePicker';

const AddMenuModal = ({navigation}) => {
  const {
    state: {
      ui: {isVendorsMenuLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const [dishName, setDishName] = useState({
    field: 'Dish name',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const [variantName, setVariantName] = useState({
    field: 'Variant name',
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

  const [variantPrice, setVariantPrice] = useState({
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

  const [categoryName, setCategoryName] = useState({
    field: 'Category name',
    value: '',
    validationRules: {
      minLength: 3,
    },
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

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [modalTimeVisible, setTimeModalVisible] = useState(false);
  const setDateHandler = (newDate) => {
    setDate(newDate);
  };

  const saveTimeHandler = async () => {
    setTime(getTime(date));
    setTimeModalVisible(false);
  };

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

  const [variantArray, setVariantArray] = useState([]);

  const addVariantHandler = () => {
    let curPrice = variantPrice.value;
    let curVar = variantName.value;

    setVariantArray([...variantArray, {variant_name: curVar, price: curPrice}]);

    setVariantPrice({...variantPrice, value: ''});

    setVariantName({...variantName, value: ''});
  };

  const removeVariantHandler = (i) => {
    const newVars = [...variantArray.slice(0, i), ...variantArray.slice(i + 1)];
    setVariantArray(newVars);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const validateMenu = () => {
    let error = validate(
      dishName.value,
      dishName.validationRules,
      dishName.field,
    );
    if (error) {
      return error;
    }

    error = validate(price.value, price.validationRules, price.field);
    if (error) {
      return error;
    }

    error = validate(price.value, price.validationRules, price.field);
    if (error) {
      return error;
    }

    error = validate(
      selectedCategory.value,
      selectedCategory.validationRules,
      selectedCategory.field,
    );
    if (error) {
      return error;
    }

    error = validate(
      description.value,
      description.validationRules,
      description.field,
    );

    if (isEmpty(time)) {
      error = 'Preparation time field is required';
    }
    return error;
  };

  const addMenuHandler = async () => {
    let error = validateMenu();
    if (error) {
      setError(error);
    } else {
      const data = {
        name: dishName.value,
        price: price.value,
        description: description.value,
        productvariant: variantArray,
        preparation_time: time,
      };
      error = await dispatch(addMenu(data));
    }
  };

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title="Add to Menu"
        onLeftPress={goBack}
      />

      {modalTimeVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTimeVisible}
          onRequestClose={() => {
            setTimeModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="time"
                date={date}
                onSetDate={setDateHandler}
              />
              <MyButton
                style={styles.btnStyle}
                text="Save"
                textStyle={styles.textStyle}
                onPress={saveTimeHandler}
              />
            </View>
          </View>
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputText
              placeholder="Category name"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={categoryName.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) =>
                setCategoryName({...categoryName, value: input})
              }
              autoCapitalize="none"
              returnKeyType="next"
            />
            <MyButton
              style={styles.chatBtn}
              text="Save"
              textStyle={styles.varStyle}
              iconStyle={styles.iconStyle}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView style={styles.container}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.priceTitle}>Category</Text>
                  <MyButton
                    style={styles.catBtn}
                    text=""
                    textStyle={styles.varStyle}
                    icon="plus"
                    iconColor="#fff"
                    iconSize={10}
                    onPress={() => setModalVisible(true)}
                  />
                </View>
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

            <Text style={styles.priceTitle}>Preparation Time</Text>
            <TouchableOpacity
              onPress={() => setTimeModalVisible(true)}
              style={styles.timeStyle}>
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>

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
              // multiline
              // numberOfLines={2}
              maxLength={50}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <View style={styles.variantRow}>
              <Text style={styles.varText}>Variants</Text>

              <MyButton
                style={styles.chatBtn}
                text="Add variant"
                textStyle={styles.varStyle}
                icon="plus"
                iconColor="#fff"
                iconSize={18}
                iconStyle={styles.iconStyle}
                onPress={addVariantHandler}
              />
            </View>
            {variantArray.map((elem, i) => (
              <View style={styles.variant}>
                <>
                  <View
                    key={i + elem.name}
                    style={[
                      styles.varBox,
                      {paddingHorizontal: 20, paddingVertical: 10},
                    ]}>
                    <Text style={[styles.varText, {fontSize: 18}]}>
                      {elem.name}
                    </Text>
                    <Text style={[styles.varText, {fontSize: 18}]}>
                      # {elem.price}
                    </Text>
                  </View>
                  <View style={styles.clear}>
                    <MyButton
                      style={styles.clearBtn}
                      textStyle={styles.clearStyle}
                      rightIcon="trash"
                      iconColor={ALMOST_BLACK}
                      iconSize={15}
                      onPress={() => removeVariantHandler(i)}
                    />
                  </View>
                </>
              </View>
            ))}
            <View style={styles.variant}>
              <View style={{...styles.varBox, width: '100%'}}>
                <InputText
                  placeholder="Name"
                  placeholderTextColor={GREY}
                  value={variantName.value}
                  containerStyle={styles.nameStyle}
                  autoCorrect={false}
                  onSubmitEditing={() => {}}
                  onChangeText={(input) =>
                    setVariantName({...variantName, value: input})
                  }
                  autoCapitalize="none"
                  returnKeyType="next"
                />

                <InputText
                  placeholder=""
                  placeholderTextColor={LIGHT_GREY}
                  title="#"
                  autoCorrect={false}
                  value={variantPrice.value}
                  containerStyle={styles.varPriceStyle}
                  inputStyle={styles.inputStyle}
                  titleStyle={styles.varTitleStyle}
                  onSubmitEditing={() => {}}
                  onChangeText={(input) =>
                    setVariantPrice({...variantPrice, value: input})
                  }
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            <MyButton
              text="Add to Menu"
              style={styles.btnStyle}
              textStyle={styles.textStyle}
              icon="plus"
              onPress={addMenuHandler}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddMenuModal;
