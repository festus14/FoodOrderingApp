import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function DateTimePicker({date, style, onSetDate, ...props}) {
  return (
    <View style={[styles.container, style]}>
      <DatePicker date={date} onDateChange={onSetDate} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
