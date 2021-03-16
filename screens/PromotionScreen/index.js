/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import EmptyComponent from '../../components/EmptyComponent';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import PromoCodeItem from '../../components/PromoCodeItem';
import {Store} from '../../store';
import {getPromoCodes} from '../../store/actions';
import {LIGHT_GREY, MAIN_COLOR} from '../../utility/colors';

const PromoScreen = ({navigation}) => {
  const {
    state: {
      ui: {isPromoLoading: isLoading},
      promos: {promos},
    },
    dispatch,
  } = useContext(Store);

  const fetchPromoCodes = async () => {
    let error = await dispatch(getPromoCodes());
    if (error) {
      Alert.alert('Error', error);
    } else {
    }
  };

  useEffect(() => {
    fetchPromoCodes();
    return () => {};
  }, []);

  const goBack = () => navigation.goBack();

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title="Promo Codes"
        onLeftPress={goBack}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={30} color={MAIN_COLOR} />
          </View>
        ) : (
          <FlatList
            data={[{id: 1}, {id: 2}]}
            renderItem={({item, index, separators}) => (
              <PromoCodeItem item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshing={isLoading}
            onRefresh={fetchPromoCodes}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyComponent text="promo codes" onRefresh={fetchPromoCodes} />
            }
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default PromoScreen;

const styles = {};
