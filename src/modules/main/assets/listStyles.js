import { colors, sizes, scale, fontSizes, shadow } from '~/configs/styles';
import { Animated } from 'react-native';

export default {
	// wrapper: {
	// 	flex: 1,
	// 	marginBottom: sizes.footerHeight
	// },
	listView: {
		backgroundColor: colors.primaryBackgroundColor
	},
	refreshColor: colors.refreshColor,
	footerMarginAnim: new Animated.Value( 1 ),
	actionButtonScaleAnim: new Animated.Value( 1 ),
	activeBanner: {
		margin: 1 * scale,
		borderWidth: sizes.borderWidth,
		borderColor: colors.primaryBorderColor,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		...shadow
	},
	activeText: {
		fontSize: fontSizes.normal
	}
};