import React from 'react';
import {Text, View, Platform} from 'react-native';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import Checkbox from './Checkbox';
import RadioIcon from './RadioIcon';

export default function FoodContentItem({item, checked, onCheck}) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <RadioIcon checked={checked} onCheck={onCheck} />
        <Text style={styles.name}>{item.variant_name.trim()}</Text>
      </View>
      <Text style={styles.price}>₦{item.price}</Text>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.88,
    height: SCREEN_HEIGHT * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'center',
    paddingRight: 8,
    paddingLeft: 18,
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  price: {
    color: SECONDARY_COLOR,
  },
  name: {
    textAlign: 'left',
    textTransform: 'capitalize',
    paddingLeft: 15,
  },
};
