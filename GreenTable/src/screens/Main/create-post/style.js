import {StyleSheet} from 'react-native';
import {Color} from '../../../shared/utils/colors-pack';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  safeContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
  },
  bg: {
    backgroundColor: Color.PRIMARY_COLOR,
  },
  head: {
    width: '100%',
  },
  p15: {
    padding: 15,
  },
  container: {
    height: windowHeight - 130,
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrap:{
    flex:1,
    },
  postImageContainer: {
    borderRadius: 8,
    backgroundColor: Color.LIGHT_GREEN,
    width: '100%',
    minHeight: 200,
    maxHeight: 360,
  },
  footerContainer: {
    minHeight: 100,
    backgroundColor: Color.LIGHT_GREEN,
  },
  
});
