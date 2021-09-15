import { StyleSheet } from 'react-native';
import { Color } from '../../../shared/utils/colors-pack';

const transactionTitleHeight = 40;

export default StyleSheet.create({
  bg: {
    backgroundColor: Color.BODY_BG
  },
  head: {
    width: '100%',    
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#222222ac",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
		position: 'relative'
  },
  creditInfoSec: {
    marginTop: 70,
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
    color: Color.SECONDARY_COLOR
  },
  transactionContainer: {
    marginTop: 10,
    backgroundColor: Color.BODY_BG
  },
  transactionTitle: {
    height: transactionTitleHeight,
    paddingHorizontal: 15,    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
