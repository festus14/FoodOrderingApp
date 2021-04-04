import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Store} from '../store';
import {likeVendor} from '../store/actions';
import {SECONDARY_COLOR} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';
import MyImage from './MyImage';

const VendorItem = ({item, onPress}) => {
  const {
    state: {},
    dispatch,
  } = useContext(Store);

  const [vendor, extraInfo] = item;

  const getRatingIcon = (val) => {
    if (val <= 2) {
      return 'ios-star-outline';
    } else if (val <= 4.0) {
      return 'ios-star-half-outline';
    }
    return 'ios-star-sharp';
  };

  const onLikeHandler = (like) => {
    let error = dispatch(likeVendor(vendor.restaurant.id));
    if (!error) {
      Alert.alert(
        'Error',
        `Attempt to ${like ? 'like' : 'unlike'} this vendor failed, try again`,
      );
    } else {
      Alert.alert(
        'Success',
        `Restaurant ${like ? 'added' : 'removed'} to favorites`,
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Icon
            name="ios-radio-button-on-outline"
            color={SECONDARY_COLOR}
            size={22}
          />
          {extraInfo.additional_info.liked_by_user ? (
            <TouchableOpacity onPress={() => onLikeHandler(false)}>
              <Icon name="ios-heart-sharp" color={SECONDARY_COLOR} size={22} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onLikeHandler(true)}>
              <Icon
                name="ios-heart-outline"
                color={SECONDARY_COLOR}
                size={22}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <MyImage
            uri={vendor.restaurant.image}
            resizeMode="cover"
            priority="high"
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.time}>
            {extraInfo.additional_info.delivery_time.slice(0, -4)}s
          </Text>
          <Text style={styles.vendor}>{vendor.restaurant.firstname}</Text>
          <View style={styles.rating}>
            <Icon
              name={getRatingIcon(vendor.rating)}
              color={SECONDARY_COLOR}
              size={15}
            />
            <Text> 3.5 </Text>
            <View style={{justifyContent: 'center'}}>
              <Icon name="ellipse" color="#000" size={6} />
            </View>
            <Text style={{color: SECONDARY_COLOR}}>
              {' '}
              {'#'.repeat(vendor?.restaurant?.expensive_rate)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorItem;

const styles = {
  container: {
    width: SCREEN_WIDTH * 0.42,
    height: SCREEN_HEIGHT * 0.32,
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
    alignSelf: 'center',
    height: '60%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 100000,
  },
  rating: {
    flexDirection: 'row',
  },
  ratingText: {paddingLeft: 5},
  time: {
    marginTop: 5,
  },
};
