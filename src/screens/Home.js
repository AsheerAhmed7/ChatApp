import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {heightToDp, widthToDp} from '../utils/responsive';

const Home = () => {
  const navigation = useNavigation();
  const data = useSelector(state => state);
  const dispatch = useDispatch();
  const id = useSelector(state => state._id);

  useEffect(() => {
    console.log('stateeeeeeeee===== heloo=== ', data.contacted[0]);
  }, [data]);

  const handleLogout = () => {
    data?.socket.disconnect();
    console.log('Disconnected from socket server');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>{data?.email}</Text>
            <Text style={styles.profileText}>{data?.email}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Contacts')}>
              <Text style={styles.buttonText}>Start Chatting with People</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: widthToDp(4),
  },
  profileContainer: {
    marginBottom: heightToDp(4),
  },
  profileText: {
    fontSize: widthToDp(5),
    marginBottom: heightToDp(1),
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    padding: heightToDp(2),
    borderRadius: widthToDp(2),
    marginBottom: heightToDp(2),
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: widthToDp(4.5),
  },
});

export default Home;
