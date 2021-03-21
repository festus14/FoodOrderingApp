/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EmptyComponent from '../../components/EmptyComponent';
import Header from '../../components/Header';
import PromoCodeItem from '../../components/PromoCodeItem';
import {Store} from '../../store';
import {getPromoCodes, applyCode, setCheckoutInfo} from '../../store/actions';
import {MAIN_COLOR} from '../../utility/colors';

const PromoScreen = ({navigation}) => {
  const {
    state: {
      ui: {isPromoLoading: isLoading},
      promos: {promos},
      cart: {subtotal},
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
    if (promos.length === 0) {
      fetchPromoCodes();
    }
    return () => {};
  }, [promos.length]);

  const goBack = () => navigation.goBack();

  const [loading, setLoading] = useState('');

  const onApplyHandler = async ({id}) => {
    setLoading(id);
    let error = await dispatch(applyCode({code: id, fee: subtotal}));
    if (error) {
      Alert.alert('Error', error);
    } else {
      await dispatch(setCheckoutInfo({promoId: id}));
      goBack();
    }
    setLoading('');
  };

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
            data={promos}
            renderItem={({item, index, separators}) => (
              <PromoCodeItem
                item={item}
                onApply={() => onApplyHandler(item)}
                isLoading={loading}
              />
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
