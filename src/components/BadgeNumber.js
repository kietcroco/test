/**
 * @flow
*/
"use strict";
import React from 'react';
import { View, Text } from 'react-native';
import Circle from './Circle';
import mergeStyle from '~/utilities/mergeStyle';

class BadgeNumber extends React.PureComponent {

	static displayName = "@badge-number";

	static propTypes = {
		style: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		children: React.PropTypes.element,
		number: React.PropTypes.number, // số notification
		textStyle: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		numberStyle: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
		]),
		ignoreValid: React.PropTypes.bool // bỏ qua kiểm tra số notifi
	};

	static defaultProps = {
		ignoreValid: false	
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.number !== nextProps.number ||
			this.props.ignoreValid !== nextProps.ignoreValid ||
			this.props.children != nextProps.children ||
			this.props.numberStyle != nextProps.numberStyle ||
			this.props.textStyle != nextProps.textStyle ||
			this.props.style != nextProps.style
		);
	}

	render() {

		const { style, children, number, ignoreValid, numberStyle, textStyle } = this.props;

		return (
			<View style={ style }>
				<View style={ _styles.container }>
					{ children }
				</View>
				{
					((ignoreValid && number != 0) || number) ? 
						<Circle size={18} style={[ _styles.number, (Array.isArray(numberStyle) ? mergeStyle(numberStyle) : numberStyle) ]}>
							<Text style={[ _styles.text, (Array.isArray(textStyle) ? mergeStyle(textStyle) : textStyle) ]}>{ (number > 99) ? 99 + "+" : ((number < -99) ? "-99": number) }</Text>
						</Circle>
					: null
				}
			</View>
		);
	}
}

const _styles = {
	container: {
		flex: 1,
		marginTop: 10,
		marginRight: 10,
		overflow: "hidden"
	},
	number: {
		position:'absolute',
		top: 0,
		right: 0,
		backgroundColor: 'red',
		zIndex: 1,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontSize: 10,
		color: "white",
		textAlign: "center",
		textAlignVertical: "center"
	}
};

export default BadgeNumber;