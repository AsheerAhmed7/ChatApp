import React, {useEffect, useState, useRef} from 'react';
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
  const scrollViewRef = useRef();

  const dispatch = useDispatch();

  const sendMessage = () => {
    const data = {
      senderID: id,
      receiverID: receiver._id,
      message: message,
    };
    dispatch(addMessage(data));
    socket.emit('sendMessage', data);
    setMessage('');
  };

  socket.on('receivedMessage', receivedData => {
    console.log('received message: ', receivedData);
    dispatch({type: 'UPDATE_MESSAGES', payload: receivedData});
  });

  useEffect(() => {
    dispatch(fetchMessages(id, receiver._id));
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
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <View style={styles.messageContainer}>
          {messages &&
            messages.map((item, index) => (
              <View
                key={index}
                style={
                  item.senderID === id
                    ? styles.messageBubbleRight
                    : styles.messageBubbleLeft
                }>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
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
  messageBubbleLeft: {
    maxWidth: '70%',
    padding: widthToDp(3),
    backgroundColor: '#e1ffc7',
    borderRadius: widthToDp(2),
    marginBottom: widthToDp(2),
    alignSelf: 'flex-start',
  },
  messageBubbleRight: {
    maxWidth: '70%',
    padding: widthToDp(3),
    backgroundColor: '#d1f4ff',
    borderRadius: widthToDp(2),
    marginBottom: widthToDp(2),
    alignSelf: 'flex-end',
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
