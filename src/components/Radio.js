"use strict";
import React from 'react';
import { View } from 'react-native';

class Radio extends React.Component {
	
	static displayName = "@Radio";

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
			<View style={ this.props.style ? [ _styles.container, this.props.style ] : _styles.container }>
				{ this.props.checked && <View style={ _styles.checked }/>}
			</View>
		);
	}
}

const _styles = {

	container: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderColor: "#e0e0e0",
		borderWidth: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	checked: {
		backgroundColor: "#0DFF92",
		width: 10,
		height: 10,
		borderRadius: 10
	}
};

export default Radio;