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
    height: windowHeight - 50,
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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
