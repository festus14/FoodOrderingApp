import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const DismissKeyboard = ({children, style = {flex: 1}}) => {
  return (
    <TouchableWithoutFeedback style={style} onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
