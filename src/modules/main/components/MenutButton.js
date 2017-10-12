import React from 'react';
import { TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { sizes, colors, fontSizes, hitSlop } from '~/configs/styles';

class MenuButton extends React.Component {

	static displayName = "@MenuButton";

	shouldComponentUpdate() {

		return false;
	}

	render() {

		return (
			<TouchableOpacity activeOpacity={ colors.activeOpacity } hitSlop={ hitSlop } style={ _styles.container } onPress={ () => {
				this.props.navigation.navigate("DrawerOpen");
			} }>
				<FAIcon name="bars" style={ _styles.icon }/>
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		width: sizes.buttonNormal, 
		height: "100%", 
		justifyContent: "center",
		alignItems: "center",
		//paddingLeft: 5 * scale
	},
	icon: {
		color: colors.secondColor,
		fontSize: fontSizes.large
	}
};

export default MenuButton;