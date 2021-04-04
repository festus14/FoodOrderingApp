/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {Alert, KeyboardAvoidingView, View} from 'react-native';
import {Bubble, GiftedChat, MessageText, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {Store} from '../../store';
import {getChats} from '../../store/actions';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';

export default function ChatModal({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const chat_id = route.params.chat_id;

  const socket = new WebSocket(`wss://api.boxin.ng/ws/chat/${chat_id.name}/`);

  const {
    state: {
      ui: {isOrderChartLoading: isLoading},
      user: {user},
    },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    socket.onopen = async () => {
      try {
        socket.send(
          JSON.stringify({
            chatId: chat_id.id,
            command: 'fetch_messages',
          }),
        );
      } catch (error) {
        console.log('Error in fetching', error);
      }
    };

    socket.onmessage = ({data}) => {
      try {
        data = JSON.parse(data);

        const info = data.messages || [data.message];

        if (data.error !== true && info) {
          if (info.length === 1) {
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, info[0]),
            );
          } else {
            setMessages([...messages, ...info]);
          }
        } else {
        }
      } catch (err) {
        console.log(`⚠️ WEBSOCKET MESSAGE ERROR - ${err.message}`);
      }
    };

    socket.onerror = (error) => {
      console.log('>> WS ERROR: ', error.message);
    };

    socket.onclose = (error) => {
      console.log('>> WS CLOSED -', error);
    };
  }, []);

  const onSend = useCallback(async (message = []) => {
    try {
      const msg = JSON.stringify({
        chatId: chat_id.id,
        message: message[0].text,
        from: user.user_id,
        command: 'new_message',
      });
      socket.send(msg);
      await fetchChats();
    } catch (error) {
      console.log('Error in sending...', error);
    }
  }, []);

  const fetchChats = async () => {
    let error = await dispatch(getChats());
    if (error) {
      Alert.alert('Error', error);
    }
  };

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
            _id: user.user_id,
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
