import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
  },
  content: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex:1000,
      width: '100%',
      height: '100%',   
      alignItems: 'center',
      justifyContent: 'center',
  },
  icon:{
    
  },
  text:{
     color:'#fff',
     fontSize:20,
     marginTop:20,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: "center"
  },
});
