import React, {useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import OrderInfoItem from '../../components/OrderInfoItem';
import {Store} from '../../store';
import {cancelOrder} from '../../store/actions';
import {LIGHTER_GREY, MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';

const EditAccountScreen = ({navigation}) => {
  const {
    state: {
      ui: {isOrdersLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  const goBack = () => navigation.goBack();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title="Edit Account"
          onLeftPress={goBack}
        />

        <ScrollView style={styles.container}>
          <Text style={styles.orderTitle}>Personal Details</Text>
          <View style={styles.orderInfo}>
            <Text style={styles.label}>First Name</Text>
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

            <Text style={styles.label}>Last Name</Text>
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

            <Text style={styles.label}>Phone</Text>
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
              text="Save"
              style={styles.btn}
              isLoading={isLoading}
              onPress={() => console.log('Edited')}
            />
          </View>

          <Text style={styles.orderTitle}>Change Password</Text>

          <View style={styles.orderInfo}>
            <InputText
              secureTextEntry={true}
              placeholder="Current Password"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={''}
              onSubmitEditing={() => {}}
              onChangeText={(input) => console.log('hello')}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <InputText
              secureTextEntry={true}
              placeholder="New Password"
              placeholderTextColor={LIGHTER_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={''}
              onSubmitEditing={() => {}}
              onChangeText={(input) => console.log('hello')}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <MyButton
              text="Change Password"
              style={styles.btn}
              isLoading={isLoading}
              onPress={() => console.log('Edited')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EditAccountScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: LIGHTER_GREY,
  },
  orderInfo: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  state: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
  stateBack: {
    width: 70,
    height: 18,
    backgroundColor: '#009C22',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  vendor: {
    fontWeight: 'bold',
  },
  time: {
    fontWeight: '100',
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 18,
  },
  orderTitle: {
    fontSize: 15,
    marginVertical: 10,
    paddingLeft: 18,
    color: MAIN_COLOR,
  },
  cancelBtn: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0606',
    height: 32,
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  chatBtn: {
    width: '32%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    paddingLeft: 12,
    paddingRight: 8,
    height: 34,
  },
  textStyle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal',
  },
  last: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    paddingRight: 10,
  },
  label: {
    // marginTop: 30,
    fontSize: 12,
  },
  containerStyle: {
    marginBottom: 30,
  },
  btn: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'center',
  },
};
