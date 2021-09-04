import { StyleSheet } from 'react-native';
import { Color } from '../../../shared/utils/colors-pack';

const transactionTitleHeight = 50;

export default StyleSheet.create({
  bg: {
    backgroundColor: Color.PRIMARY_COLOR
  },
  head: {
    width: '100%'
  },
  creditInfoSec: {
    marginTop: 45,
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  amountImage: {
    marginRight: 10
  },
  title: {
    color: '#fff'
  },
  transactionContainer: {
    backgroundColor: '#05482E'
  },
  transactionTitle: {
    height: transactionTitleHeight,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
