import React, {useEffect, useState} from 'react';
import {
  Image,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../utils/styles';

import {useNavigation} from '@react-navigation/native';
import {addUser} from '../redux/action';

const SignUp = () => {
  const initialState = {
    Name: '',
    email: '',
    password: '',
  };
  const [finalState, setFinalState] = useState(initialState);
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();
  const handleSignUp = () => {
    addUser(finalState, navigation);
  };
  return (
    <View style={[styles.containor, {backgroundColor: '#302D2D'}]}>
      <View
        style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{height: 100, width: 100}}></Image>
      </View>
      <View
        style={{
          flex: 0.85,

          borderTopLeftRadius: 70,
          backgroundColor: 'white',
        }}>
        <View style={styles.heading}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Signup Screen</Text>
        </View>
        <View style={{flex: 0.5, marginLeft: 15, padding: 15}}>
          <Text style={{fontSize: 18}}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={finalState.Name}
            onChangeText={value =>
              setFinalState(prev => {
                return {
                  ...prev,
                  Name: value,
                };
              })
            }></TextInput>
          <Text style={{fontSize: 18}}>Email</Text>
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
          <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
              SignUp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{height: 100, width: '100%', justifyContent: 'center'}}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navigate}>
              Already have an account?
              <Text
                style={[
                  styles.navigate,
                  {fontStyle: 'italic', fontWeight: 'bold'},
                ]}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
