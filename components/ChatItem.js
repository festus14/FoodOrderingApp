import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Store} from '../store';
import {LIGHT_GREY, SECONDARY_COLOR} from '../utility/colors';
import MyImage from './MyImage';

export default function ChatItem({item, navigation}) {
  // console.log('chats Item...', item);

  const {
    state: {
      ui: {isOrderChartLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('SingleChatScreen', {
          chat_id: {id: item.id, name: item.name},
        })
      }>
      <View style={styles.imageContainer}>
        {item?.participants[0]?.image ? (
          <MyImage
            uri={item?.participants[0]?.image}
            resizeMode="cover"
            style={[styles.image]}
            priority="high"
          />
        ) : (
          <Image
            source={require('../assets/images/myAvatar.png')}
            resizeMode="contain"
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.top}>
          <Text style={styles.price}>{item.participants[0].firstname}</Text>
          <Text></Text>
        </View>
        <Text style={styles.body}>{item.messages[0]?.content ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    paddingVertical: 10,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 200,
  },
  content: {
    paddingLeft: 13,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontWeight: '100',
  },
  state: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
  stateBack: {
    width: 70,
    height: 18,
    backgroundColor: '#009C22',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  price: {
    color: 'black',
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '65%',
  },
  countText: {
    color: '#fff',
    backgroundColor: SECONDARY_COLOR,
    textAlign: 'center',
    width: 18,
    borderRadius: 5,
  },
  imageContainer: {
    width: '20%',
  },
};
