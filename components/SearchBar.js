import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LIGHT_GREY} from '../utility/colors';

export default function SearchBar({size, color}) {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Icon name="search" size={size} color={color} />
      <TextInput
        placeholder="Search for vendor"
        placeholderTextColor={LIGHT_GREY}
        value={text}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(input) => setText(input)}
        returnKeyType="search"
      />
      <View style={styles.iconStyle}>
        <Icon name="pencil" size={size} color={color} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(190, 190, 190)',
        shadowOpacity: 0.6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconStyle: {
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
