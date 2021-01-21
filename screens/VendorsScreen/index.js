import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
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
    imageURL: '../../assets/images/boxin-white.png',
  },
  {
    id: 4,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 5,
    imageURL: '../../assets/images/burger.png',
  },
  {
    id: 6,
    imageURL: '../../assets/images/boxin-white.png',
  },
];

const VendorsScreen = ({navigation}) => {
  const goBack = () => navigation.goBack();

  return (
    <>
      <Header
        leftIcon="arrow-left"
        title="Delivering To"
        onLeftPress={goBack}
      />

      <SafeAreaView style={{flex: 1}}>
        <SearchBar />
        <View style={styles.container}>
          <DismissKeyboard>
            <KeyboardAvoidingView>
              <Text>All Vendors</Text>
              <FlatList
                data={DATA}
                renderItem={({item, index, separators}) => (
                  <VendorItem item={item} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                onRefresh={() => console.warn('Refreshed')}
              />
            </KeyboardAvoidingView>
          </DismissKeyboard>

          <View style={styles.bottomContainer}>
            <Text style={styles.firstText}>
              Your favorite vendor is not listed?
            </Text>
            <Text style={styles.secondText}>Recommend Vendor</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    height: '100%',
    position: 'relative',
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
};

export default VendorsScreen;
