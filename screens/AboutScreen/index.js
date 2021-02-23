import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import {LIGHTER_GREY} from '../../utility/colors';

const AboutScreen = ({navigation}) => {
  const goBack = () => navigation.goBack();

  return (
    <>
      <Header leftIcon="ios-arrow-back" title="About" onLeftPress={goBack} />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>Help and FAQs</Text>
            <Icon name="ios-send" size={20} color={LIGHTER_GREY} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>Contact</Text>
            <Icon name="ios-send" size={20} color={LIGHTER_GREY} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>Terms and Conditions</Text>
            <Icon name="ios-send" size={20} color={LIGHTER_GREY} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>Privacy Policy</Text>
            <Icon name="ios-send" size={20} color={LIGHTER_GREY} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default AboutScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderColor: LIGHTER_GREY,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
};
