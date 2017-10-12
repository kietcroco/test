import { sizes, colors, fontSizes, scale } from '~/configs/styles';

export default {
	wrapper: {
		flex: 1,
		backgroundColor : colors.secondColor
	},
	container: {
		marginHorizontal: sizes.margin,
		marginTop: sizes.margin,
		paddingBottom: sizes.formPaddingBottom
	},
	title: {
		fontWeight: "bold",
		height: 30 * scale,
		backgroundColor: colors.secondBackgroundColor,
		textAlignVertical: "center",
		paddingLeft: sizes.spacing,
		marginTop: sizes.margin,
		marginBottom: sizes.spacing,
		fontSize: fontSizes.normal
	}
};