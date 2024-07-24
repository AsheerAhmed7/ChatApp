import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const data = useSelector(state => state);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      if (data._id) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
        SplashScreen
      </Text>
    </View>
  );
};

export default SplashScreen;
