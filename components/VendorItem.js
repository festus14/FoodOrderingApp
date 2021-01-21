import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import RadioButton from './RadioButton';

const VendorItem = ({}) => {
  const [selected, setSelected] = useState(false);
  const [favorite, setFavorite] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <RadioButton
          button={{size: 20, color: SECONDARY_COLOR, selected}}
          onPress={() => setSelected(!selected)}
        />
        <RadioButton
          button={{size: 20, color: SECONDARY_COLOR, selected: favorite}}
          onPress={() => setFavorite(!favorite)}
        />
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
          <Icon name="arrow-left" color={SECONDARY_COLOR} size={15} />
          <Text style={styles.ratingText}>3.5 ##</Text>
        </View>
      </View>
    </View>
  );
};

export default VendorItem;

const styles = {
  container: {
    width: SCREEN_WIDTH * 0.42,
    height: SCREEN_HEIGHT * 0.35,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
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
    // width: '50%',
    height: '50%',
  },
  image: {height: '100%'},
  rating: {
    flexDirection: 'row',
  },
  ratingText: {paddingLeft: 5},
};
