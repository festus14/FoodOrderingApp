import React from 'react';
import {Text, View} from 'react-native';
import {MAIN_COLOR} from '../utility/colors';
import MyButton from './MyButton';

export default function EmptyComponent({text, onRefresh, onPress}) {
  return (
    <View style={styles.empty}>
      <Text>There seems to be no {text} yet.</Text>
      {onRefresh && <Text>Pull down to refresh</Text>}
      {onPress && (
        <MyButton
          text={`Add ${text}`}
          style={styles.btnStyle}
          textStyle={styles.textStyle}
          icon="plus"
          iconColor={MAIN_COLOR}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = {
  empty: {
    alignItems: 'center',
  },
  emptyText: {
    padding: 20,
  },
  btnStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    marginTop: 10,
  },
  textStyle: {
    color: MAIN_COLOR,
    textAlign: 'center',
    paddingLeft: 10,
  },
};
