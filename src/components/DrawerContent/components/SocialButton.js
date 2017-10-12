"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { colors, scale, fontSizes, hitSlop } from '~/configs/styles';

class SocicalButton extends React.Component {

	static displayName = "SocicalButton";

	static propTypes = {
		children: PropTypes.string.isRequired,
		iconName: PropTypes.oneOf([
			"google-plus-square",
			"facebook-square",
			"youtube-square"
		]).isRequired,
		onPress: PropTypes.func
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.iconName !== nextProps.iconName ||
			this.props.children !== nextProps.children
		);
	}

	render() {

		const { children, iconName, onPress } = this.props;

		return (
			<TouchableOpacity onPress={ onPress } hitSlop={hitSlop} style={ _styles.container }>
				<Text style={ _styles.label }>{ children }</Text>
				<FAIcon name={ iconName } style={ iconName === "facebook-square" ? [_styles.icon, {color: "#3a5898"}] : _styles.icon }/>
			</TouchableOpacity>
		)
	}
}

const _styles = {
	container: {
		flexDirection: "row",
		paddingLeft: 25 * scale,
		paddingVertical: 1.5 * scale,
		alignItems: "center",
		width: 130 * scale,
		justifyContent: "space-between"
	},
	label: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	},
	icon: {
		color: "#cb3233",
		fontSize: fontSizes.normal
	}
};

export default SocicalButton;