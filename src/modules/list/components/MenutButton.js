import React from 'react';
import { TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class MenuButton extends React.PureComponent {

	static displayName = "@MenuButton";

	shouldComponentUpdate() {

		return false;
	}

	render() {

		return (
			<TouchableOpacity style={ _styles.container } onPress={ () => {

				this.props.navigation.navigate("DrawerOpen");
			} }>
				<FAIcon name="bars" style={ _styles.icon }/>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		width: 30, 
		height: "100%", 
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 5
	},
	icon: {
		color: "white",
		fontSize: 16
	}
};

export default MenuButton;