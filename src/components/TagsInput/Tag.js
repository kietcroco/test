"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { colors, backgroundColors } from './constants';
import { sizes, fontSizes, scale, hitSlop } from '~/configs/styles';

class Tag extends React.Component {

	static displayName = "Tag";

	static propTypes = {
		children: PropTypes.string.isRequired,
		onRemove: PropTypes.func.isRequired,
		messageType: PropTypes.oneOf([
			null,
			"error",
			"success",
			"warning"
		])
	};

	static defaultProps = {
		messageType: "success"
	};

	shouldComponentUpdate( nextProps ) {
		
		return (
			this.props.messageType !== nextProps.messageType ||
			this.props.children !== nextProps.children
		);
	}

	render() {

		const { style, children, onRemove, messageType } = this.props;

		return (
			<View style={ [_styles.container, style, {
				backgroundColor: backgroundColors[ messageType ],
				borderColor: colors[ messageType ]
			}] }>
				<Text style={[ _styles.label, {
					color: colors[ messageType ]
				}]}>{ children }</Text>
				<TouchableOpacity onPress={ onRemove } style={ _styles.btnRemove } hitSlop={ hitSlop }>
					<FAIcon name="times" style={ [_styles.iconRemove, {
						color: colors[ messageType ]
					}] }/>
				</TouchableOpacity>
			</View>
		)
	}
}

const _styles = {
	container: {
		flexDirection: "row",
		paddingLeft: 8 * scale,
		paddingRight: sizes.spacing,
		paddingVertical: 4.5 * scale,
		//backgroundColor: "#cde69c",
		borderWidth: sizes.borderWidth,
		//borderColor: "#3c763d",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 2 * scale,
		marginRight: 8 * scale,
		marginVertical: 2 * scale
	},
	label: {
		fontSize: fontSizes.small,
		marginRight: 8 * scale
	},
	btnRemove: {
		justifyContent: "center",
		alignItems: "center"
	},
	iconRemove: {
		//color: "#3c763d",
		fontSize: 10 * scale
	}
};

export default Tag;