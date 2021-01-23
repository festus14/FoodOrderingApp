import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LIGHTER_BLACK, LIGHT_GREY, SECONDARY_COLOR} from '../utility/colors';

export default function SearchBar() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="ios-search-outline" size={30} color={SECONDARY_COLOR} />
      </View>
      <TextInput
        placeholder="Search for vendor"
        placeholderTextColor={LIGHT_GREY}
        value={text}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(input) => setText(input)}
        returnKeyType="search"
      />
      <View style={styles.icon}>
        <Icon name="ios-menu-outline" size={30} color={LIGHTER_BLACK} />
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
  icon: {
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingBottom: 8,
    paddingRight: 10,
    fontSize: 17,
    flex: 1,
  },
};
