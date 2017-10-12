import { colors, scale } from '~/configs/styles';

export default {
	container: {
		backgroundColor: colors.primaryColor,
		borderRadius: 4 * scale,
		paddingLeft: 3 * scale,
		paddingRight: 3 * scale,
		paddingTop: 1 * scale,
		paddingBottom: 1 * scale,
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		color: colors.secondColor,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 18 * scale
	}
	
};