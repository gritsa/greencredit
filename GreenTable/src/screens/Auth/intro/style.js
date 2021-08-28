import { StyleSheet } from 'react-native';
const PRIMARY_COLOR = '#348565';
const SECONDARY_COLOR = '#1B1D4D';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
	},
	left: {
		width: '30%',
		backgroundColor: 'rgba(52,133,101, .05)'
	},
	right: {
		backgroundColor: '#fff'
	},
	contents: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		paddingVertical: '15%',
		paddingVertical: '15%',
		paddingHorizontal: 60,
		display: 'flex',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
	},
	text: {
		fontSize: 12,
		fontWeight: '500',
		color: '#fff'
	},
	// for sliders
	sliderContainer: {
		height: '100%',
		paddingBottom: 10,
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'center',
	},
	introImage: {
		marginBottom: 30,
		height: '100%',
		width: '100%',
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
		color: SECONDARY_COLOR
	},
	introDescription2: {
		fontSize: 13,
		fontWeight: 'normal',
		color: 'white',
		color: SECONDARY_COLOR
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