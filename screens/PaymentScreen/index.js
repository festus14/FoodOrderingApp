/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import {SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import PaymentItem from '../../components/PaymentItem';

const PaymentScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Payment Method"
          leftIcon="ios-arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <PaymentItem navigation={navigation} />
          {/* <PaymentItem navigation={navigation} /> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;

const styles = {
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  infoImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
  },
  bImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: '#fff',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoHeader: {},
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  topTabs: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTab: {
    color: '#fff',
    justifyContent: 'flex-end',
    width: '50%',
  },
  activeTopTab: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
  },
  topText: {
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};
