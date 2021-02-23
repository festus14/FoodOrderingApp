import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {styles} from './style';

const PromotionScreen = ({navigation}) => {
  const [code, setCode] = useState({
    field: 'Code',
    value: '',
    validationRules: {
      minLength: 2,
    },
  });

  const goBack = () => navigation.goBack();

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title="Promotions"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <InputText
              placeholder="Enter promo code"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={code.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setCode({...code, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <Text style={styles.codeText}>Get your first promotion</Text>
            <MyButton
              text="Apply"
              style={styles.btn}
              onPress={() => {
                goBack();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PromotionScreen;
