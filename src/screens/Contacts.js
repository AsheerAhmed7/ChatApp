import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPeople} from '../redux/action';
import {heightToDp, widthToDp} from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import io from 'socket.io-client';
const SOCKET_SERVER_URL = 'http://192.168.1.12:3000';
const Contacts = () => {
  const id = useSelector(state => state._id);
  const people = useSelector(state => state.people);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('dataaaaaaaaaaaaa===== ', id);
    dispatch(fetchPeople(id));
  }, []);
  useEffect(() => {
    console.log('atttttt contacctttttttttttsss');
    const socket = io(SOCKET_SERVER_URL);
    dispatch({type: 'ADD_SOCKET', payload: socket});
    socket.on('connect', () => {
      socket.emit('addSocket', {id: id});
    });
    return () => {
      socket.disconnect();
      dispatch({type: 'ADD_SOCKET', payload: null});
    };
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.bar}>
            <Text style={styles.barText}>Contacts in App</Text>
          </View>
          {people &&
            people.map(item => (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  navigation.navigate('ChatRoom', {receiver: item})
                }
                style={styles.contactItem}>
                <Image
                  source={{uri: 'https://via.placeholder.com/100'}} // Replace with the actual image URL
                  style={styles.contactImage}
                />
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactName}>{item.email}</Text>
                  <Text style={styles.contactEmail}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    padding: widthToDp(4),
  },
  bar: {
    backgroundColor: 'black',
    paddingVertical: heightToDp(2),
    paddingHorizontal: widthToDp(4),
    borderRadius: widthToDp(2),
    marginBottom: heightToDp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  barText: {
    fontSize: widthToDp(5),
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: widthToDp(4),
    marginBottom: heightToDp(2),
    borderRadius: widthToDp(2),
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: widthToDp(2),
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: widthToDp(15),
    height: widthToDp(15),
    borderRadius: widthToDp(7.5),
    marginRight: widthToDp(4),
  },
  contactTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: widthToDp(4.5),
    fontWeight: 'bold',
    color: '#333',
  },
  contactEmail: {
    fontSize: widthToDp(3.5),
    color: '#666',
    marginTop: heightToDp(0.5),
  },
});

export default Contacts;
