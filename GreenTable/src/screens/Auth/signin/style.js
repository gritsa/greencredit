import { StyleSheet } from 'react-native';
const PRIMARY_COLOR = '#348565';
const SECONDARY_COLOR = '#1B1D4D';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',		
		justifyContent: 'space-between'
	},
	left: {
		width: 100,
		backgroundColor: 'rgba(52,133,101, .05)'
	},
	right: {	
		backgroundColor:'#fff'		
	},
	bgImage: {
		position:'absolute',
		resizeMode: "cover",				
		width: 260,
		height: 347,
		top: 100,
		right: 0			
	},
	contents: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		paddingVertical: '15%',
		paddingHorizontal: 60,
		display: 'flex',
		justifyContent: 'center'
	},
	buttonApple: {
		backgroundColor: '#000',
	},
	buttonIcon: {
		marginRight: 15
	},
	buttonGoogle: {
		backgroundColor: '#fff',
		color: SECONDARY_COLOR,
		marginBottom: 20,
		marginTop: 50
	},
	text: {
		color: '#fff'
	},
	// for sliders
	sliderContainer: {
		paddingBottom: 10,
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'center',
		maxWidth: 190
	},
	introImage: {
		marginBottom: 30,
		maxWidth: 280,
		maxHeight: 300,
	},
	introTitle: {
		fontSize: 11,
		fontWeight: '500',
		color: PRIMARY_COLOR
	},
	introDescription1: {
		fontSize: 24,
		color: 'white',
		paddingVertical: 10,
		fontWeight: 'bold',
		color: SECONDARY_COLOR,
		lineHeight: 34,
	},
	introDescription2: {
		fontSize: 13,
		fontWeight: 'normal',
		color: 'white',
		color: SECONDARY_COLOR,
		lineHeight: 22,
	},
	dotStyle: {
		height: 8,
		width: 8,
		backgroundColor: 'rgba(27,29,77, .15)',
	},
	activeDotStyle: {
		height: 8,
		width: 8,
		backgroundColor: 'rrgba(27,29,77, 1);',
	}
});