import { sizes, colors, fontSizes, scale } from '~/configs/styles';

export default {
	wrapper: {
		flex: 1,
		backgroundColor : colors.secondColor
	},
	headerRight: {
		flexDirection: "row",
		marginLeft: sizes.margin
	},
	headerButton: {
		width: sizes.buttonNormal,
		alignItems: "center",
		justifyContent: "center"
	},
	headerIcon: {
		color: colors.secondColor,
		fontSize: 16 * scale
	},
	noteWrapper: {
		padding: sizes.margin,
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	dividerTitle: {
		color: colors.titleColor,
		fontWeight: "bold",
		marginBottom: sizes.spacing,
		fontSize: fontSizes.normal
	},
	viewedIcon: {
		fontSize: fontSizes.small,
		color: colors.italicColor,
		textAlign: "center",
		textAlignVertical: "center"
	},
	contentContainer: {
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
	},
	tagContainer: {
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		padding: sizes.margin
	},
	tagContent: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	tag: {
		backgroundColor: colors.secondBackgroundColor,
		borderRadius: sizes.spacing,
		marginTop: sizes.spacing,
		marginLeft: sizes.spacing,
		paddingTop: 2 * scale,
		paddingBottom: 2 * scale,
		paddingLeft: sizes.margin,
		paddingRight: sizes.margin,
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	dividerRelations: {
		color: colors.titleColor,
		fontSize: fontSizes.normal,
		fontWeight: "bold",
		marginLeft: sizes.margin,
		marginBottom: sizes.spacing
	},
	relationsContainer: {
		borderTopWidth: sizes.borderWidth,
		borderTopColor: colors.primaryBorderColor,
		paddingTop: sizes.margin,
		paddingBottom: sizes.margin
	},
	relationNotFound: {
		padding: sizes.margin
	},
	textRelationNotFound: {
		color: colors.secondColor,
		fontSize: fontSizes.normal,
		textAlign: "center",
		textAlignVertical: "center",
		backgroundColor: colors.secondBackgroundColor,
		height: 20 * scale,
		borderRadius: sizes.borderRadius
	},
	refreshColor: colors.refreshColor,
	footer: {
		position: "relative"
	},
	actionButton: {
		position: "absolute",
		right: sizes.margin,
		bottom: sizes.footerHeight + sizes.margin + (0.5 * scale)
	},
	text: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	rowContent: {
		paddingRight: sizes.margin
	},
	viewedContainer: {
		marginTop: sizes.margin,
		alignSelf: "flex-end"
	}
};