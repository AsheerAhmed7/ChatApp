import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../utils/styles';
import {useNavigation} from '@react-navigation/native';
import {addUser, login} from '../redux/action';
import {useDispatch} from 'react-redux';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [finalState, setFinalState] = useState(initialState);
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login(finalState, navigation));
  };

  return (
    <View style={[styles.containor, {backgroundColor: '#302D2D'}]}>
      <View
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{height: 190, width: 190}}></Image>
      </View>
      <View
        style={{
          flex: 0.75,

          borderTopLeftRadius: 70,
          backgroundColor: 'white',
        }}>
        <View style={styles.heading}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Login Screen</Text>
        </View>
        <View style={{flex: 0.5, marginLeft: 15, padding: 15}}>
          <Text style={{fontSize: 18}}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={finalState.email}
            onChangeText={value =>
              setFinalState(prev => {
                return {
                  ...prev,
                  email: value,
                };
              })
            }></TextInput>
          <Text style={{fontSize: 18}}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={finalState.password}
            onChangeText={value =>
              setFinalState(prev => {
                return {
                  ...prev,
                  password: value,
                };
              })
            }></TextInput>
          <View style={{height: 45, width: '100%'}}>
            {message ? (
              <View
                style={{
                  margin: 3,
                  flexDirection: 'row',
                  borderWidth: 2,
                  borderColor: 'red',
                }}>
                <Text style={{color: 'red', fontSize: 14}}>{message}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{height: 150, width: '100%', justifyContent: 'center'}}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.navigate}>
              Don't have an account?
              <Text
                style={[
                  styles.navigate,
                  {fontStyle: 'italic', fontWeight: 'bold'},
                ]}>
                SignUp
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
