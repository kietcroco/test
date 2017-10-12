import { sizes, colors, fontSizes, scale } from '~/configs/styles';

export default {
	input: {
		marginVertical: sizes.spacing
	},
	inputRow: {
		flexDirection: "row",
		marginVertical: sizes.spacing,
		justifyContent: "space-between"
	},
	inputLeft: {
		width: "54%"
	},
	inputRight: {
		width: "26%"
	},
	inputMiddle: {
		height: 45 * scale,
		justifyContent: "center",
		alignItems: "center"
	},
	textOr: {
		fontSize: fontSizes.small,
		paddingBottom: 2 * scale
	},
	textChoosePrice: {
		fontSize: fontSizes.small,
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		paddingTop: 2 * scale
	},
	fieldset: {
		marginVertical: sizes.spacing,
		position: "relative"
	},
	rowContact: {
		flexDirection: "row",
		marginVertical: sizes.spacing,
		alignItems: "flex-start"
	},
	contact: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: 60 * scale,
		alignItems: "center",
		marginRight: sizes.margin
	},
	iconContact: {
		color: "white",
		backgroundColor: "#2672ba",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 18 * scale,
		borderRadius: 4 * scale,
		width: sizes.inputContactHeight + (3 * scale),
		height: sizes.inputContactHeight
	},
	inputContact: {
		flex: 1
	},
	inputContactStyle: {
		height: sizes.inputContactHeight
	},
	imageRow: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	errorMessage: {
		color: colors.errorColor
	},
	time_daily:{
		flex: 1,
		flexDirection: "row",
		marginVertical : sizes.spacing,
	},
	time_daily_txt :{
		paddingHorizontal : sizes.spacing,
		fontSize: fontSizes.normal,
		color : colors.boldColor
	}
};