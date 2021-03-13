/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import VendorItem from '../../components/VendorItem';
import {SECONDARY_COLOR} from '../../utility/colors';
import {Store} from '../../store';

const VendorsScreen = ({navigation}) => {
  const {
    state: {
      ui: {isVendorsLoading: isLoading},
      vendors: {vendors},
      user: {userAddress},
    },
    dispatch,
  } = useContext(Store);

  const goBack = () => navigation.goBack();

  const headerComponent = (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: '#fff',
          fontWeight: '300',
          fontSize: 17,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        Delivering To
      </Text>
      <Text
        style={{
          color: '#fff',
          fontWeight: '100',
          fontSize: 14,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        {userAddress}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        // rightIcon="ios-chevron-down-outline"
        component={headerComponent}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            data={vendors}
            renderItem={({item, index, separators}) => (
              <VendorItem
                item={item}
                onPress={() =>
                  navigation.navigate('SingleVendorScreen', {item})
                }
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={isLoading}
            onRefresh={() => {}}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text style={styles.vendorText}>All Vendors</Text>
            }
            ListFooterComponent={
              <View style={styles.bottomContainer}>
                <Text style={styles.firstText}>
                  Your favorite vendor is not listed?
                </Text>
                <Text style={styles.secondText}>Recommend Vendor</Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  firstText: {
    fontSize: 15,
    fontWeight: '300',
  },
  secondText: {
    fontSize: 13,
    color: SECONDARY_COLOR,
  },
  topText: {
    fontSize: 17,
    fontWeight: '600',
  },
  scroll: {
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  vendorText: {
    paddingLeft: 10,
    fontWeight: '600',
    fontSize: 17,
  },
};

export default VendorsScreen;
