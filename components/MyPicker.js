import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function MyPicker({
  items,
  setSelected,
  labelText,
  labelStyle = {},
  pickerStyle = {},
  picker = {},
  valueKey = 'id',
  labelKey = 'name',
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
      {labelText && (
        <Text style={[styles.keyText, labelStyle]}>{labelText}:</Text>
      )}
      <Picker
        {...props}
        selectedValue={chosenValue}
        style={[styles.picker, picker]}
        onValueChange={(itemValue, itemIndex) => setNewValue(itemValue)}
        itemStyle={styles.item}>
        {items.map((option) => (
          <Picker.Item
            key={option.id}
            label={option[labelKey]}
            value={option[valueKey]}
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
    borderColor: '#CCC',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderColor: '#CCC',
  },
  keyText: {
    fontSize: 16,
    alignSelf: 'flex-start',
    color: '#000',
  },
  item: {
    color: '#000',
    fontSize: 10,
  },
});
