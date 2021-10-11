import { StyleSheet } from 'react-native';
import { Color } from './utils/colors-pack';
import { FontWeight } from './utils/typography-pack';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const tabHeight = 70;
const headerHeight = 50;
const popularSecHeight = 125;
const containerHeight = windowHeight - (tabHeight + headerHeight);
const transactionTitleHeight = 240;

export default StyleSheet.create({
	backButton : {
		height: 32,
		width: 32,
		borderRadius: 16,
		display: 'flex',
		flexDirection:'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonPrimary: {
		height: 46,
		width: transactionTitleHeight,
		maxWidth: transactionTitleHeight,
		borderRadius: 23,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 12,
		fontWeight: '500',
		backgroundColor: Color.PRIMARY_COLOR
	},
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
	// Font Weight
	fontThin : {
		fontWeight: FontWeight.FONT_WEIGHT_THIN
	},
	fontSemiBold : {
		fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD
	},
	fontBold : {
		fontWeight: FontWeight.FONT_WEIGHT_BOLD
	},
	// Text Color
	textWhite: {
		color: '#fff'
	},
	textWhite_50 : {
		color: Color.WHITE_50
	},
	textPrimary: {
		color: Color.PRIMARY_COLOR
	},
	textSecondary: {
		color: Color.SECONDARY_COLOR
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
		height: containerHeight,
		backgroundColor:'#fff'	
	},
	pagerBox: {		
		height: containerHeight - 160,		
		width: '100%',		
		backgroundColor: Color.LIGHT_GREEN	
	},
	popularSecHeight : {
		height : popularSecHeight
	},
	activityPostContainer : {
		height : windowHeight - (45 + headerHeight+tabHeight+popularSecHeight)		
	},	
	transactionScrollContainer : {	
		backgroundColor: Color.LIGHT_GREEN,	
		height : windowHeight - ( headerHeight+tabHeight + 260),				
		paddingTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	couponListScrollContainer : {				
		height : windowHeight - ( headerHeight+tabHeight + 220),				
		paddingHorizontal: 16,			
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
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
		minWidth: 32		
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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
		position: 'relative'
	},
	totalCreditText: {
		fontSize: 35,
		fontWeight: FontWeight.FONT_WEIGHT_BOLD
	}
})