import { sizes , colors, fontSizes, scale } from '~/configs/styles';

const TABSYMBOL = "  ";
const SPACESYMBOL = " ";
const SEPARATE = `${TABSYMBOL}-${TABSYMBOL}`;

export default {
	TABSYMBOL,
	SPACESYMBOL,
	SEPARATE,
	wrapper: {
		flex: 1,
		paddingLeft: sizes.padding,
		paddingTop: 0
	},
	textRow: {
		textAlign: "left",
		textAlignVertical: "center",
		paddingBottom: sizes.spacing,
		color: colors.normalColor,
		fontSize: fontSizes.normal
	},
	row: {
		flexDirection: 'row',
		paddingBottom: sizes.spacing,
		alignItems: "center",
		flexWrap: "wrap"
	},
	icon: {
		textAlign: "center",
		textAlignVertical: "center",
		marginRight: sizes.spacing,
		color: colors.primaryColor,
		fontSize: fontSizes.normal
	},
	text: {
		textAlignVertical: "center",
		color: colors.normalColor,
		fontSize: fontSizes.normal
	},
	textPrice: {
		textAlignVertical: "center",
		fontSize: fontSizes.normal,
		color: colors.highlightColor,
		fontWeight: "bold"
	},
	italicText: {
		textAlignVertical: "center",
		fontSize: fontSizes.small,
		color: colors.italicColor
	},
	txtTimeAgo: {
		textAlign: "right",
		textAlignVertical: "center",
		fontSize: fontSizes.small,
		color: colors.italicColor
	},
	highlightType: {
		color: colors.highlightColor
	}
};