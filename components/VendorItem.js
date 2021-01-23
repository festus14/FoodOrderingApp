import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import RadioButton from './RadioButton';

const VendorItem = ({items}) => {
  const [selected, setSelected] = useState(false);
  const [favorite, setFavorite] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="ios-radio-button-on-outline"
          color={SECONDARY_COLOR}
          size={22}
        />

        <Icon name="ios-heart-outline" color={SECONDARY_COLOR} size={22} />
      </View>
      <View style={styles.center}>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.time}>35-50mins</Text>
        <Text style={styles.vendor}>KFC</Text>
        <View style={styles.rating}>
          <Icon name="star-half-outline" color={SECONDARY_COLOR} size={15} />
          <Text style={styles.ratingText}>
            3.5 <Text style={{color: SECONDARY_COLOR}}>##</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VendorItem;

const styles = {
  container: {
    width: SCREEN_WIDTH * 0.42,
    height: SCREEN_HEIGHT * 0.37,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    marginHorizontal: 8,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  image: {height: '100%'},
  rating: {
    flexDirection: 'row',
  },
  ratingText: {paddingLeft: 5},
};
