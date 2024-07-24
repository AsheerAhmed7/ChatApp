import React from 'react';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  containor: {
    flex: 1,
  },
  heading: {
    flex: 0.3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '80%',
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 40,
  },
  btn: {
    backgroundColor: '#3D3D3D',
    borderWidth: 2,
    borderColor: '#3D3D3D',
    width: '90%',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  navigate: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },
});
export default styles;
