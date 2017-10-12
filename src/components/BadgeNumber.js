"use strict";

/**
 * @flow
*/
import PropTypes from 'prop-types';

import React from 'react';
import { View, Text } from 'react-native';
import Circle from './Circle';
import mergeStyle from '~/library/mergeStyle';
import { colors, scale } from '~/configs/styles';

class BadgeNumber extends React.Component {

	static displayName = "@badge-number";

	static propTypes = {
		style: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array
		]),
		children: PropTypes.element,
		number: PropTypes.number, // số notification
		textStyle: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array
		]),
		numberStyle: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array
		]),
		ignoreValid: PropTypes.bool // bỏ qua kiểm tra số notifi
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
						<Circle size={18 * scale} style={[ _styles.number, (Array.isArray(numberStyle) ? mergeStyle(numberStyle) : numberStyle) ]}>
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
		marginTop: 10 * scale,
		marginRight: 10 * scale,
		overflow: "hidden"
	},
	number: {
		position:'absolute',
		top: 0,
		right: 0,
		backgroundColor: colors.highlightColor,
		zIndex: 1,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		padding: 2 * scale
	},
	text: {
		fontSize: 10 * scale,
		color: colors.secondColor,
		textAlign: "center",
		textAlignVertical: "center",
		backgroundColor: "transparent"
	}
};

export default BadgeNumber;