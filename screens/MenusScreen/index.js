/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodItem from '../../components/FoodItem';
import Header from '../../components/Header';
import {SECONDARY_COLOR, MAIN_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {getMenus} from '../../store/actions';
import MyButton from '../../components/MyButton';

const MenusScreen = ({navigation}) => {
  const {
    state: {
      ui: {isVendorsMenuLoading: isLoading},
      vendors: {menus},
    },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    const fetchMenus = async () => {
      let error = await dispatch(getMenus());
      if (error) {
        Alert.alert('Error', error);
      } else {
      }
    };

    fetchMenus();
    return () => {};
  }, []);

  const goBack = () => navigation.goBack();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header leftIcon="ios-arrow-back" title="Menu" onLeftPress={goBack} />

        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={30} color={MAIN_COLOR} />
            </View>
          ) : menus.length !== 0 ? (
            <>
              <FlatList
                data={menus}
                renderItem={({item, index, separators}) => (
                  <FoodItem item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshing={false}
                onRefresh={() => console.warn('Refreshed')}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                There seems to be no menu yet.
              </Text>
              <MyButton
                text="Add to Menu"
                style={styles.btnStyle}
                textStyle={styles.textStyle}
                icon="plus"
                iconColor={MAIN_COLOR}
                onPress={() => navigation.navigate('AddMenuModal')}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default MenusScreen;

const styles = {
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
  infoHeader: {
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  topTab: {
    color: '#fff',
    justifyContent: 'flex-end',
    marginBottom: 30,
    height: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 12,
  },
  activeTopTab: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
  },
  topText: {
    justifyContent: 'center',
    fontWeight: '100',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  empty: {
    alignItems: 'center',
  },
  emptyText: {
    padding: 20,
  },
  btnStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
  },
  textStyle: {
    color: MAIN_COLOR,
    textAlign: 'center',
    paddingLeft: 10,
  },
};