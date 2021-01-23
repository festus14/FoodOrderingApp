import React from 'react';
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
import {SCREEN_WIDTH} from '../../utility/constants';

const DATA = [
  {
    id: 1,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 2,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 3,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 4,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 5,
    imageURL: '../../assets/images/burger.png',
  },
];

const headerComponent = (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: '#fff', fontWeight: '300', fontSize: 17}}>
      Delivering To
    </Text>
    <Text style={{color: '#fff', fontWeight: '100', fontSize: 16}}>
      Omovie street, Okota, Lagos.
    </Text>
  </View>
);

const VendorsScreen = ({navigation}) => {
  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftIcon="ios-arrow-back"
        rightIcon="ios-chevron-down-outline"
        component={headerComponent}
        onLeftPress={goBack}
      />

      <SearchBar />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.vendorText}>All Vendors</Text>
          <FlatList
            data={DATA}
            renderItem={({item, index, separators}) => (
              <VendorItem item={item} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={false}
            onRefresh={() => console.warn('Refreshed')}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.bottomContainer}>
            <Text style={styles.firstText}>
              Your favorite vendor is not listed?
            </Text>
            <Text style={styles.secondText}>Recommend Vendor</Text>
          </View>
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
