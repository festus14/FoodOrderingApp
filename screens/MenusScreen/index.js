/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MenuItem from '../../components/MenuItem';
import Header from '../../components/Header';
import {SECONDARY_COLOR, MAIN_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {getMenus} from '../../store/actions';
import EmptyComponent from '../../components/EmptyComponent';
import MyButton from '../../components/MyButton';

const MenusScreen = ({navigation}) => {
  const {
    state: {
      ui: {isVendorsMenuLoading: isLoading},
      vendors: {menus},
    },
    dispatch,
  } = useContext(Store);

  const fetchMenus = async () => {
    let error = await dispatch(getMenus());
    if (error) {
      Alert.alert('Error', error);
    } else {
    }
  };

  useEffect(() => {
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
          ) : (
            <FlatList
              data={menus}
              renderItem={({item, index, separators}) => (
                <MenuItem item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshing={isLoading}
              onRefresh={fetchMenus}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyComponent text="menu" onRefresh />}
              ListFooterComponent={
                <MyButton
                  text={'Add menu'}
                  style={styles.btnStyle}
                  textStyle={styles.textStyle}
                  icon="plus"
                  iconColor={MAIN_COLOR}
                  onPress={() => navigation.navigate('AddMenuModal')}
                />
              }
            />
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
