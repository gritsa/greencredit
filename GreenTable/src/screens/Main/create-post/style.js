import { StyleSheet } from 'react-native';
import { Color } from '../../../shared/utils/colors-pack';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  bg: {
    backgroundColor: Color.PRIMARY_COLOR
  },
  head: {
    width: '100%'
  },
  p15: {
    padding: 15
  },
  container: {  
    height: windowHeight - 170, 
    display: 'flex',
    justifyContent: 'space-between'
  },
  postImageContainer: {
    borderRadius: 8,
    backgroundColor: Color.LIGHT_GREEN,
    width: '100%',
    minHeight: 200,
    maxHeight: 360    
  },
  footerContainer: {
    minHeight: 100,
    backgroundColor: Color.LIGHT_GREEN,
  }
});
