import React from 'react';
import {Text, View, Platform} from 'react-native';
import {MAIN_COLOR, SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import Checkbox from './Checkbox';

export default function FoodContentItem() {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <Checkbox isChecked />
        <Text>Fried plantain</Text>
      </View>
      <Text style={styles.price}>N300</Text>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.84,
    height: SCREEN_HEIGHT * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
    alignSelf: 'center',
    paddingRight: 8,
    paddingLeft: 18,
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderColor: '#E5E5E5',
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
        elevation: 4,
      },
    }),
  },
  side: {
    flexDirection: 'row',
    width: '42%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: SECONDARY_COLOR,
  },
};
