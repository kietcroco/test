import React from 'react';
import { TouchableOpacity } from 'react-native';
import BadgeNumber from '~/components/BadgeNumber';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class Notification extends React.PureComponent {

	static displayName = "@Notification";

	shouldComponentUpdate() {

		return false;
	}

	render() {

		return (
			<TouchableOpacity style={ _styles.container }>
				<BadgeNumber style={ _styles.container } number={10}>
					<FAIcon name="bell" style={ _styles.icon }/>
				</BadgeNumber>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: "100%",
		width: 30
	},
	icon: {
		color: "white",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 12,
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 1,
		borderColor: "white"
	}
};

export default Notification;