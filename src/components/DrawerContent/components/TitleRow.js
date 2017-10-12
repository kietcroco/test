"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { colors, scale, fontSizes, sizes } from '~/configs/styles';

class TitleRow extends React.Component {

	static displayName = "TitleRow";

	static propTypes = {
		children: PropTypes.string.isRequired,
		iconName: PropTypes.string.isRequired
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.children !== nextProps.children ||
			this.props.iconName !== nextProps.iconName
		);
	}

	render() {

		const { children, iconName } = this.props;

		return (
			<View style={ _styles.container }>
				<FAIcon name={ iconName } style={ _styles.icon }/>
				<Text style={ _styles.title }>{ children }</Text>
			</View>
		)
	}
}

const _styles = {
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: sizes.spacing
	},
	title: {
		fontSize: fontSizes.large,
		color: colors.boldColor,
		fontWeight: "bold"
	},
	icon: {
		color: colors.primaryColor,
		fontSize: fontSizes.normal,
		width: 25 * scale
	}
};

export default TitleRow;