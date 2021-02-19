/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {Alert, KeyboardAvoidingView, View} from 'react-native';
import {Bubble, GiftedChat, MessageText, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Store} from '../../store';
import {getOrderChat} from '../../store/actions';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';

export default function ChatModal({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const chat_id = route.params.chat_id;

  const {
    state: {
      ui: {isOrderChartLoading: isLoading},
    },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    const fetchOrderChat = async () => {
      let error = await dispatch(getOrderChat(chat_id));
      if (error) {
        Alert.alert('Error', error);
      }
    };

    fetchOrderChat();
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 5,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 6,
        text: 'Hello consumer, how may I help you',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title={'Single Chat'}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(message) => onSend(message)}
          user={{
            _id: 1,
          }}
          scrollToBottom={true}
          alignTop={true}
          alwaysShowSend={true}
          renderSend={(props) => (
            <Send {...props}>
              <View style={styles.btn}>
                <Icon name="ios-send" color={SECONDARY_COLOR} size={25} />
              </View>
            </Send>
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: MAIN_COLOR,
                },
              }}
            />
          )}
          renderMessageText={(props) => (
            <MessageText
              {...props}
              textStyle={{
                right: {
                  color: '#fff',
                },
                left: {
                  color: '#000',
                },
              }}
            />
          )}
          showUserAvatar={true}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  btn: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: MAIN_COLOR,
    height: 39,
    width: 39,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
