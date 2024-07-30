import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import persistReducer from 'redux-persist/es/persistReducer';
import {thunk} from 'redux-thunk';
const initialState = {
  _id: null,
  Name: '',
  email: '',
  password: '',
  contacted: [],
  messages: [],
  people: [],
  socket: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_DETAILS': {
      return {
        _id: action.payload._id,
        Name: action.payload.Name,
        email: action.payload.email,
        password: action.payload.password,
        contacted: action.payload.contacted,
      };
    }
    case 'PEOPLE_DETAILS': {
      return {
        ...state,
        people: action.payload,
      };
    }
    case 'ADD_SOCKET': {
      return {
        ...state,
        socket: action.payload,
      };
    }
    case 'ADD_MESSAGES': {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case 'UPDATE_MESSAGES': {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
const BlacklistFilter = createFilter('reducer', null, ['socket']);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [BlacklistFilter],
};

const persistReducers = persistReducer(persistConfig, reducer);
const middleware = applyMiddleware(thunk);
export const store = createStore(persistReducers, middleware);
export const persistStores = persistStore(store);
