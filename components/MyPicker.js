import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LIGHT_GREY} from '../utility/colors';

export default function MyPicker({
  items,
  setSelected,
  labelText,
  pickerStyle = {},
  picker = {},
  ...props
}) {
  const [chosenValue, setChosenValue] = useState('...');
  const setNewValue = (value, index) => {
    setChosenValue(value);
    if (chosenValue) {
      setSelected(value);
    }
  };
  return (
    <View style={[styles.container, pickerStyle]}>
      {labelText && <Text style={styles.keyText}>{labelText}:</Text>}
      <Picker
        {...props}
        selectedValue={chosenValue}
        style={[styles.picker, picker]}
        onValueChange={(itemValue, itemIndex) => setNewValue(itemValue)}>
        {items.map((option) => (
          <Picker.Item
            key={option.id}
            label={option.name}
            value={option.code}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
  },
  keyText: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
});
