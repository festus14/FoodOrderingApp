import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, LIGHTER_GREY, ALMOST_BLACK} from '../utility/colors';

export default function CheckoutItem({
  item,
  navigation,
  deleteItem,
  increment,
}) {
  const [count, setCount] = useState(item.count);

  const incrementHandler = async (isInc) => {
    if (isInc) {
      setCount(count + 1);
      increment(item.id, true);
    } else {
      if (count !== 1) {
        setCount(count - 1);
        increment(item.id, false);
      }
    }
  };
  return (
    <View style={styles.controlList}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.price, styles.coloredText]}>
          N{item.price * count}
        </Text>
      </View>
      <View style={styles.controlContainer}>
        <View style={styles.control}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => incrementHandler()}>
            <Text style={styles.addText}>-</Text>
          </TouchableOpacity>
          <View style={styles.amount}>
            <Text>{count}</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => incrementHandler(true)}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.trash}
          onPress={() => deleteItem(item.id)}>
          <Icon name="ios-trash" color={ALMOST_BLACK} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = {
  controlList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  control: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(77, 84, 124)',
        shadowOpacity: 0.09,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 10,
      },
    }),
    backgroundColor: 'white',
    borderRadius: 5,
  },
  coloredText: {
    color: SECONDARY_COLOR,
  },
  addBtn: {
    backgroundColor: LIGHTER_GREY,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    width: 35,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlContainer: {
    flexDirection: 'row',
  },
  trash: {
    paddingLeft: 10,
  },
};
