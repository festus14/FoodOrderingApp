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
      minLength: 4,
    },
  });

  const goBack = () => navigation.goBack();

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title="Enter OTP"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.codeText}>
              We have sent a verification code to your email
            </Text>
            <InputText
              placeholder="Enter verification code"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={code.value}
              onSubmitEditing={() => {}}
              onChangeText={(input) => setCode({...code, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <MyButton
              text="Verify"
              style={styles.btn}
              onPress={() => {
                navigation.navigate('HomeBottomNavigator');
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default PromotionScreen;
