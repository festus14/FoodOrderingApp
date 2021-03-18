import React from 'react';
import {View, Text} from 'react-native';

export default function CalculationItem({title, value, valStyle, titleStyle}) {
  return (
    <View style={styles.container}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={valStyle}>₦{value}</Text>
    </View>
  );
}
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
};
