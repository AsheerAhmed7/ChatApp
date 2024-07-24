import {applyMiddleware, createStore} from 'redux';
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
  }
};
const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);
export default store;
