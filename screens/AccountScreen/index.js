import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Store} from '../../store';
import {LIGHTER_GREY, MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {capitalize} from '../../utility/helpers';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MyModal from '../../components/MyModal';
import {changeProfilePicture} from '../../store/actions';
import MyImage from '../../components/MyImage';

const AccountScreen = ({navigation}) => {
  const {
    state: {
      user: {user},
      ui: {isUserLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const names = user?.fullname?.split(' ') ?? [
    user?.firstname ?? ' ',
    user?.lastname ?? ' ',
  ];

  const [filePath, setFilePath] = useState({});

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
    setModalVisible(false);
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
        let error = await dispatch(changeProfilePicture(response));
        if (error) {
          Alert.alert('Error', error);
        } else {
          Alert.alert('Success', 'Profile picture updated');
        }
      });
    }
  };

  const chooseFile = (type) => {
    setModalVisible(false);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
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
      let error = await dispatch(changeProfilePicture(response));
      if (error) {
        Alert.alert('Error', error);
      } else {
        Alert.alert('Success', 'Profile picture updated');
      }
    });
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header title="Account" />

      <MyModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        btnTxt="CANCEL"
        headerTxt="Select Image"
        onPress={() => setModalVisible(false)}>
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

      <View style={styles.container}>
        <View style={styles.head}>
          {isLoading ? (
            <ActivityIndicator color={MAIN_COLOR} style={styles.image} />
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}>
              {user.image ? (
                <MyImage
                  uri={user.image}
                  resizeMode="cover"
                  style={[styles.image]}
                  priority="high"
                />
              ) : (
                <Image
                  source={require('../../assets/images/myAvatar.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles.details}>
            <Text style={styles.title}>{names[0] + ' ' + names[1]}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAccountScreen')}>
              <Text style={styles.account}>View account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('PromotionScreen')}>
          <View style={styles.icon}>
            <Icon name="md-pricetags-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Promotions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('AboutScreen')}>
          <View style={styles.icon}>
            <Icon
              name="md-chatbox-ellipses-sharp"
              size={35}
              color={SECONDARY_COLOR}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>About</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.body}
          onPress={() => navigation.navigate('BecomeVendorScreen')}>
          <View style={styles.icon}>
            <Icon name="person-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Become a vendor</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.body}>
          <View style={styles.icon}>
            <Icon name="md-bicycle-sharp" size={35} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Driver's page</Text>
          </View>
        </View> */}
      </View>
    </>
  );
};

export default AccountScreen;

const styles = {
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  head: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  image: {borderRadius: 100000, height: 60, width: 60},
  details: {
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    paddingBottom: 3,
    textTransform: 'capitalize',
  },
  account: {
    color: SECONDARY_COLOR,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 35,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
  },
  icon: {
    marginRight: 40,
    paddingVertical: 18,
    paddingLeft: 30,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
  },
  body: {flexDirection: 'row'},
  text: {fontSize: 18},
  imageOption: {
    marginVertical: 10,
  },
  imageText: {
    fontSize: 18,
  },
};
