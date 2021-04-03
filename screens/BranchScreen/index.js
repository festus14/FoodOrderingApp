/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EmptyComponent from '../../components/EmptyComponent';
import Header from '../../components/Header';
import BranchItem from '../../components/BranchItem';
import {Store} from '../../store';
import {getBranches, deleteBranch} from '../../store/actions';
import {MAIN_COLOR} from '../../utility/colors';
import MyButton from '../../components/MyButton';
import {SCREEN_HEIGHT} from '../../utility/constants';

const BranchScreen = ({navigation}) => {
  const {
    state: {
      ui: {isBranchLoading: isLoading},
      branches: {branches},
    },
    dispatch,
  } = useContext(Store);

  const fetchBranches = async () => {
    let error = await dispatch(getBranches());
    if (error) {
      Alert.alert('Error', error);
    } else {
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const goBack = () => navigation.goBack();

  const deleteBranchHandler = async (id) => {
    let error = await dispatch(deleteBranch(id));
    if (error) {
      Alert.alert('Error', error);
    } else {
      Alert.alert('Success', 'Branch deleted successfully');
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header
          leftIcon="ios-arrow-back"
          title="Branches"
          onLeftPress={goBack}
        />

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={30} color={MAIN_COLOR} />
          </View>
        ) : (
          <FlatList
            data={branches}
            renderItem={({item, index, separators}) => (
              <BranchItem
                item={item}
                onDelete={() => deleteBranchHandler(item.id)}
                isLoading={isLoading}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshing={isLoading}
            onRefresh={fetchBranches}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyComponent text="branch" onRefresh={fetchBranches} />
            }
            ListFooterComponent={
              <MyButton
                text="Add branch"
                style={styles.btnStyle}
                textStyle={styles.textStyle}
                icon="plus"
                iconColor={MAIN_COLOR}
                onPress={() => navigation.navigate('AddBranchScreen')}
              />
            }
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default BranchScreen;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    marginTop: 10,
  },
  textStyle: {
    color: MAIN_COLOR,
    textAlign: 'center',
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
    height: SCREEN_HEIGHT * 0.45,
    marginHorizontal: 5,
    marginTop: 50,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 10,
  },
  inputStyle: {},
  titleStyle: {},
  codeText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 70,
  },
  containerStyle: {
    marginTop: 30,
  },
  btn: {
    width: '100%',
    marginTop: 25,
    justifyContent: 'center',
  },
});
