import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function RoundButton({text, roundBtn = {}, textStyle}) {
  return (
    <TouchableOpacity style={[styles.container, roundBtn]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
  },
};
