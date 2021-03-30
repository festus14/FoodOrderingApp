import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {LIGHT_GREY, SECONDARY_COLOR} from '../utility/colors';

export default function ChatItem({item, navigation}) {
  // console.log('chats Item...', item);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('SingleChatScreen', {chat_id: item.id})
      }>
      <View>
        <Image
          source={require('../assets/images/burger.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.top}>
          <Text style={styles.price}>KFC</Text>
          <Text style={styles.countText}>1</Text>
        </View>
        <Text style={styles.body}>
          Hello want to confirm if my order is ready
        </Text>
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
  },
  countText: {
    color: '#fff',
    backgroundColor: SECONDARY_COLOR,
    textAlign: 'center',
    width: 18,
    borderRadius: 5,
  },
};
