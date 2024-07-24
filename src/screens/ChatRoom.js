import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {widthToDp, heightToDp} from '../utils/responsive';

import {useDispatch, useSelector} from 'react-redux';
import {addMessage, fetchMessages} from '../redux/action';

const ChatRoom = props => {
  const id = useSelector(state => state._id);
  const socket = useSelector(state => state.socket);
  const receiver = props.route.params.receiver;
  const [message, setMessage] = useState('');
  const messages = useSelector(state => state.messages);

  const dispatch = useDispatch();
  const sendMessage = () => {
    const data = {
      senderID: id,
      receiverID: receiver._id,
      message: message,
    };
    dispatch(addMessage(data));
    socket.emit('sendMessage', data);
  };
  socket.on('receivedMessage', receivedData => {
    console.log('receiveddddddddmesssageeeee   ', receivedData);
    receivedData = {message, senderID};
    if (receiver._id == senderID) {
      dispatch({type: 'UPDATE_MESSAGES', payload: message});
    }
  });
  useEffect(() => {
    dispatch(fetchMessages(id, receiver._id));
    console.log('receiverrrrrIDDDD  ', receiver._id);
    return () => {
      dispatch({type: 'ADD_MESSAGES', payload: null});
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>{receiver.email}</Text>
        </View>
      </View>
      <ScrollView style={styles.chatContainer}>
        <View style={styles.messageContainer}>
          {messages
            ? messages?.map((item, index) => {
                return (
                  <View key={index}>
                    {item.senderID == id ? (
                      <View
                        style={[
                          styles.messageBubble,
                          styles.messageBubbleRight,
                        ]}>
                        <Text style={styles.messageText}>{item.message}</Text>
                      </View>
                    ) : (
                      <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>{item.message}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          onChangeText={value => {
            setMessage(value);
          }}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f7f7f7',
  },
  profileImage: {
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(6),
  },
  headerTextContainer: {
    marginLeft: widthToDp(3),
  },
  profileName: {
    fontSize: widthToDp(5),
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: widthToDp(3.5),
    color: '#666',
  },
  chatContainer: {
    flex: 1,
    padding: widthToDp(4),
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: widthToDp(3),
    backgroundColor: '#e1ffc7',
    borderRadius: widthToDp(2),
    marginBottom: widthToDp(2),
  },
  messageBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f4ff',
  },
  messageText: {
    fontSize: widthToDp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(4),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: heightToDp(8),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: widthToDp(10),
    paddingHorizontal: widthToDp(4),
    paddingVertical: heightToDp(1),
  },

  sendButton: {
    marginLeft: widthToDp(2),
    backgroundColor: '#0a84ff',
    paddingVertical: heightToDp(1.5),
    paddingHorizontal: widthToDp(5),
    borderRadius: widthToDp(10),
  },
  sendButtonText: {
    color: '#fff',
    fontSize: widthToDp(4),
  },
});

export default ChatRoom;
