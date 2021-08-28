import { StyleSheet } from 'react-native';
const PRIMARY_COLOR = '#348565';
const SECONDARY_COLOR = '#1B1D4D';

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
		shadowColor: 'rgba(27,29,77, .05)',
		shadowRadius: 4.65,
		shadowOffset: {
			height: 4,
			width: 0,
		},
		shadowOpacity: 10,
	}
})