/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
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
import {
  addMenu,
  createVendorCategory,
  getVendorCategories,
} from '../../store/actions';
import MyPicker from '../../components/MyPicker';
import {getTime, isEmpty} from '../../utility/helpers';
import DateTimePicker from '../../components/DateTimePicker';
import MyImage from '../../components/MyImage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MyModal from '../../components/MyModal';

const AddMenuModal = ({navigation, route}) => {
  const item = route?.params?.item ?? {};
  const {
    state: {
      ui: {isVendorsMenuLoading: isLoading, isCategoriesLoading},
      vendors: {categories},
    },
    dispatch,
  } = useContext(Store);

  const [dishName, setDishName] = useState({
    field: 'Dish name',
    value: item?.name ?? '',
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
    value: item?.price + '' ?? '',
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
    value: item?.description + '' ?? '',
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
    value: item?.food_type + '' ?? '',
    validationRules: {
      minLength: 1,
    },
  });

  const fetchCategories = async () => {
    let error = await dispatch(getVendorCategories());
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(item?.preparation_time ?? '');
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

  const [variantArray, setVariantArray] = useState(item?.productvariant ?? []);

  const addVariantHandler = () => {
    let curPrice = variantPrice.value;
    let curVar = variantName.value;

    if (curPrice && curVar) {
      setVariantArray([
        ...variantArray,
        {variant_name: curVar, price: curPrice},
      ]);

      setVariantPrice({...variantPrice, value: ''});

      setVariantName({...variantName, value: ''});
    } else {
      Alert.alert('Info', 'Variant price and name can not be empty');
    }
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
        price: parseInt(price.value, 10),
        description: description.value,
        productvariant: variantArray,
        preparation_time: time,
        food_type: selectedCategory.value,
        food_image: filePath,
      };
      error = await dispatch(addMenu({...data, id: item?.id ?? null}));
      if (error) {
        setError(error);
      } else {
        setSuccess(`Menu ${item.id ? 'updated' : 'created'} successfully`);
        goBack();
      }
    }
  };

  const createCategoryHandler = async () => {
    let error = validate(
      categoryName.value,
      categoryName.validationRules,
      categoryName.field,
    );
    if (error) {
      setModalVisible(false);
      setError(error);
    } else {
      error = await dispatch(createVendorCategory({name: categoryName.value}));
      setModalVisible(false);
      await dispatch(fetchCategories());
      if (error) {
        setError(error);
      } else {
        setSuccess('Category created');
      }
    }
  };

  const [filePath, setFilePath] = useState({uri: item?.food_image ?? null});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        // alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async (type) => {
    setPixModalVisible(false);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, async (response) => {
        if (response.didCancel) {
          // alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          // alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    setPixModalVisible(false);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        // alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  const [pixModalVisible, setPixModalVisible] = useState(false);

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
                text={!isEmpty(categoryName.value) ? 'Save' : 'Close'}
                textStyle={styles.varStyle}
                iconStyle={styles.iconStyle}
                onPress={
                  !isEmpty(categoryName.value)
                    ? createCategoryHandler
                    : () => setModalVisible(false)
                }
                isLoading={isCategoriesLoading}
              />
            </View>
          </View>
        </Modal>
      )}

      <MyModal
        visible={pixModalVisible}
        onRequestClose={() => {
          setPixModalVisible(false);
        }}
        btnTxt="CANCEL"
        headerTxt="Select Image"
        onPress={() => setPixModalVisible(false)}>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.imageOption}
            onPress={() => captureImage('photo')}>
            <Text style={styles.imageText}>Take a photo...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.imageOption}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.imageText}>Choose from library...</Text>
          </TouchableOpacity>
        </View>
      </MyModal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <View style={styles.imageView}>
              <TouchableOpacity
                style={{marginRight: 20}}
                activeOpacity={0.5}
                onPress={() => setPixModalVisible(true)}>
                {filePath.uri ? (
                  <MyImage
                    uri={filePath.uri}
                    resizeMode="cover"
                    style={[styles.image]}
                    priority="high"
                  />
                ) : (
                  <View style={styles.imageBtn}>
                    <Text> + </Text>
                  </View>
                )}
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
              <View style={styles.variant} key={i + ''}>
                <View
                  style={[
                    styles.varBox,
                    {paddingHorizontal: 20, paddingVertical: 10},
                  ]}>
                  <Text style={[styles.varText, {fontSize: 18}]}>
                    {elem.variant_name}
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
