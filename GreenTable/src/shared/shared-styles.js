import { StyleSheet } from 'react-native';
import { Color } from './utils/colors-pack';
import { FontWeight } from './utils/typography-pack';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const tabHeight = 70;
const headerHeight = 50;
const containerHeight = windowHeight - (tabHeight + headerHeight);

export default StyleSheet.create({
	button: {
		height: 46,
		width: '100%',
		borderRadius: 23,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 12,
		fontWeight: '500',
	},
	shadow: {
		shadowColor: Color.SHADOW,
		shadowRadius: 4.65,
		shadowOffset: {
			height: 4,
			width: 0,
		},
		shadowOpacity: 10
	},
	container: {
		paddingVertical: 15,
		height: containerHeight
	},
	// Header
	header: {		
		height: headerHeight,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		fontWeight: FontWeight.FONT_WEIGHT_BOLD
	},
	headLeft: {
		minWidth: 50,
		minHeight: 32
	},
	headTitle: {
		minWidth: 50,
		maxWidth: 120,
		fontWeight: FontWeight.FONT_WEIGHT_BOLD,
		fontSize: 16
	},
	headRight: {
		minWidth: 50,
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	tabBottom: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		height: tabHeight,
		width: '100%',
		shadowColor: 'rgba(27,29,77, .05)',
		shadowRadius: 4.65,
		shadowOffset: {
			height: 4,
			width: 0,
		},
		shadowOpacity: 10
	}
})