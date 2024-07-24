/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import Contacts from './src/screens/Contacts';
import ChatRoom from './src/screens/ChatRoom';
import SplashScreen from './src/screens/SplashScreen';
import {persistStores, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStores}>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
