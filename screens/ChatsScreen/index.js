/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';
import {Store} from '../../store';
import {getChats} from '../../store/actions';
import ChatItem from '../../components/ChatItem';
import EmptyComponent from '../../components/EmptyComponent';

const ChatsScreen = ({navigation}) => {
  const {
    state: {
      ui: {isOrderChartLoading: isLoading},
      cart: {cart},
      chats: {chats},
    },
    dispatch,
  } = useContext(Store);

  const fetchChats = async () => {
    let error = await dispatch(getChats());
    if (error) {
      Alert.alert('Error', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Chats"
          rightIcon={cart.length > 0 && 'ios-cart-outline'}
          onRightPress={() =>
            navigation.navigate('CheckoutScreen', {title: 'Checkout'})
          }
          leftIcon="ios-arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={30} color={MAIN_COLOR} />
            </View>
          ) : (
            <FlatList
              data={chats}
              renderItem={({item, index, separators}) => (
                <ChatItem item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              refreshing={isLoading}
              onRefresh={fetchChats}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyComponent text="closed order" onRefresh={fetchChats} />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatsScreen;

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
