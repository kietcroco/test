import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BadgeNumber from '~/components/BadgeNumber';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { sizes, colors, fontSizes, hitSlop, scale } from '~/configs/styles';

class Notification extends React.Component {

	static displayName = "@Notification";

	shouldComponentUpdate() {

		return false;
	}

	render() {

		return (
			<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={ _styles.container }>
				<BadgeNumber style={ _styles.container }>
					<View style={ _styles.iconWrapper }>
						<FAIcon name="bell" style={ _styles.icon }/>
					</View>
				</BadgeNumber>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: "100%",
		width: sizes.buttonNormal,
		marginRight: sizes.spacing
	},
	iconWrapper: {
		borderRadius: (sizes.buttonNormal - (10 * scale))/2,
		borderWidth: sizes.borderWidth,
		borderColor: colors.secondBorderColor,
		width: sizes.buttonNormal - (10 * scale),
		height: sizes.buttonNormal - (10 * scale),
		justifyContent: "center",
		alignItems: "center"
	},
	icon: {
		color: colors.secondColor,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 12 * scale,
		backgroundColor: "transparent"
	}
};

export default Notification;