"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { colors, scale } from '~/configs/styles';

class Radio extends React.Component {
	
	static displayName = "@Radio";

	static propTypes = {
		disable: PropTypes.bool,
		checked: PropTypes.any,
		style: PropTypes.object
	};
	static defaultProps = {
		checked: false,
		disable: false
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.checked !== nextProps.checked ||
			this.props.disable !== nextProps.disable
		);
	}
	render() {

		return (
			<View style={ [ _styles.container, this.props.disable && {
				backgroundColor: colors.disableColor
			}, this.props.style ] }>
				{ this.props.checked && <View style={ _styles.checked }/>}
			</View>
		);
	}
}

const _styles = {

	container: {
		width: 20 * scale,
		height: 20 * scale,
		borderRadius: 10 * scale,
		borderColor: colors.primaryBorderColor,
		borderWidth: 1 * scale,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	checked: {
		backgroundColor: colors.checkedColor,
		width: 10 * scale,
		height: 10 * scale,
		borderRadius: 10 * scale
	}
};

export default Radio;