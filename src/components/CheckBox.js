"use strict";
import React from 'react';
import { View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class CheckBox extends React.Component {

	static displayName = "@CheckBox";

	static propTypes = {
		checked: React.PropTypes.any,
		style: React.PropTypes.object
	};
	static defaultProps = {
		checked: false
	};

	shouldComponentUpdate(nextProps, nextState) {

		return this.props.checked !== nextProps.checked;
	}

	render() {

		return (
			<View style={ this.props.style ? [_styles.container, this.props.style] : _styles.container }>
				{
					this.props.checked && <FAIcon name="check" style={ _styles.iconCheck }/>
				}
			</View>
		);
	}
}

const _styles = {
	container: {
		width: 20,
		height: 20,
		borderRadius: 3,
		borderColor: "#e0e0e0",
		borderWidth: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	iconCheck: {
		color: "#16a085",
		fontSize: 16
	}
};

export default CheckBox;