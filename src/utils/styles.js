import {StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../utils/responsive'; // Adjust the path as necessary

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    backgroundColor: '#302D2D',
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
    width: widthToDp('80%'), // Responsive width
    marginTop: heightToDp('2%'), // Responsive margin
    marginBottom: heightToDp('1%'), // Responsive margin
    borderRadius: widthToDp('10%'), // Responsive border radius
    paddingHorizontal: widthToDp('4%'), // Responsive padding
    paddingVertical: heightToDp('1.5%'), // Responsive padding
  },
  btn: {
    backgroundColor: '#3D3D3D',
    borderWidth: 2,
    borderColor: '#3D3D3D',
    width: widthToDp('90%'), // Responsive width
    borderRadius: widthToDp('10%'), // Responsive border radius
    justifyContent: 'center',
    alignItems: 'center',
    height: heightToDp('12%'), // Responsive height
    marginTop: heightToDp('2%'), // Responsive margin
  },
  navigate: {
    textAlign: 'center',
    color: 'black',
    fontSize: widthToDp('4%'), // Responsive font size
  },
});

export default styles;
