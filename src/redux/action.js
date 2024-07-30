import {StackActions} from '@react-navigation/native';

const API_URL = 'http://192.168.1.3:3000';
export const addUser = async (data, navigation) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    let response = await fetch(`${API_URL}/users/addUser`, requestOptions);
    if (response.status == 200) {
      navigation.dispatch(StackActions.replace('Login'));
    }
  } catch (err) {
    console.log('errrrr', err);
  }
};
export const login = (data, navigation) => async dispatch => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    console.log('beforeeee backend', API_URL);
    let response = await fetch(`${API_URL}/users/login`, requestOptions);
    if (response.status == 200) {
      response = await response.json();
      dispatch({type: 'ADD_USER_DETAILS', payload: response.data});
      console.log('login dataaa', response.data);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  } catch (err) {
    console.log('errrrr', err);
  }
};
export const fetchPeople = id => async dispatch => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('beforeeee backend fetchPeople', id);
    let response = await fetch(
      `${API_URL}/users/fetchPeople/${id}`,
      requestOptions,
    );
    if (response.status == 200) {
      response = await response.json();
      dispatch({type: 'PEOPLE_DETAILS', payload: response.data});
    }
  } catch (err) {
    console.log('errrrr', err);
  }
};
export const fetchMessages = (id, receiverID) => async dispatch => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('beforeeee backend fetchMessageees', id, receiverID);
    let response = await fetch(
      `${API_URL}/message/get/${id}/${receiverID}`,
      requestOptions,
    );
    if (response.status == 200) {
      response = await response.json();
      dispatch({type: 'ADD_MESSAGES', payload: response.data});
    }
  } catch (err) {
    console.log('errrrr', err);
  }
};
export const addMessage = data => async dispatch => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    console.log('beforeeee backend addMessage', data);
    let response = await fetch(`${API_URL}/message/add`, requestOptions);
    if (response.status == 200) {
      response = await response.json();
      console.log('dataaaaa===== ', response.data);
      dispatch({type: 'UPDATE_MESSAGES', payload: response.data});
    }
  } catch (err) {
    console.log('errrrr', err);
  }
};
