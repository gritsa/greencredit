import { StyleSheet } from 'react-native';
import { Color } from '../../../shared/utils/colors-pack';
import { FontWeight } from '../../../shared/utils/typography-pack';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
	},
	left: {
		width: '30%',
		backgroundColor: Color.LIGHT_GREEN
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
		backgroundColor: Color.PRIMARY_COLOR,
	},
	text: {
		fontSize: 12,
		fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD,
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
		fontWeight: FontWeight.FONT_WEIGHT_BOLD,
		color: Color.PRIMARY_COLOR
	},
	introDescription1: {
		fontSize: 24,
		color: 'white',
		paddingVertical: 10,
		fontWeight: 'bold',
		color: Color.SECONDARY_COLOR
	},
	introDescription2: {
		fontSize: 13,
		fontWeight: 'normal',
		color: 'white',
		color: Color.SECONDARY_COLOR
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