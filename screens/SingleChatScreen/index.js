/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {Alert, KeyboardAvoidingView, View} from 'react-native';
import {Bubble, GiftedChat, MessageText, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Store} from '../../store';
import {getOrderChat} from '../../store/actions';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {io} from 'socket.io-client';

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
    const socket = new WebSocket(`wss://api.boxin.ng/ws/chat/${chat_id}/`);

    socket.onopen = (data) => {
      console.log('>> WS OPENED ✅', data);
    };

    socket.onmessage = ({data}) => {
      console.log('>> WS MESSAGE: ');

      try {
        data = JSON.parse(data);

        // grab my custom ‘message’ property from the data.
        const {message} = data;
        if (data.error !== true && message) {
          // Handle the ‘type’ and ‘data’ properties...
          // this.handleMessageType(message.type, message.data)
        } else {
          // do something with the incorrect format
        }
      } catch (err) {
        console.log(`⚠️ WEBSOCKET MESSAGE ERROR - ${err.message}`);
      }
    };

    socket.onerror = (error) => {
      console.log('>> WS ERROR: ', error.message);
    };

    socket.onclose = (error) => {
      console.log('>> WS CLOSED -', error.message);
    };

    //   try {
    //     const socket = io(`wss://echo.websocket.org/`);
    //     // console.log('Socket...', socket);
    //     socket.on('message', (message) => {
    //       console.log('Message on component mount...', message);
    //       // setMessages([...messages, message]);
    //       return () => socket.disconnect();
    //     });
    //   } catch (error) {
    //     console.log('Socket error', error);
    //   }
  }, []);

  // useEffect(() => {
  //   const fetchOrderChat = async () => {
  //     let error = await dispatch(getOrderChat(chat_id));
  //     if (error) {
  //       Alert.alert('Error', error);
  //     }
  //   };

  //   fetchOrderChat();
  // }, []);

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
    ]);
  }, []);

  const onSend = useCallback((message = []) => {
    console.log('Message after each send...', message);
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
