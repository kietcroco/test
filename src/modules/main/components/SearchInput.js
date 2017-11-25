"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import { sizes, colors, fontSizes, scale } from '~/configs/styles';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class SearchInput extends React.PureComponent {

	static displayName = "@SearchInput";

	static propTypes = {
	};

	static defaultProps = {
	};

	// constructor( props ) {
	// 	super( props );

	// }

	// componentWillReceiveProps( nextProps ) {

	// }

	// shouldComponentUpdate( nextProps, nextState ) {
		
	// 	return true;
	// }

	render() {

		const {
			placeholder,
			value,
			onChangeText,
			...otherProps
		} = this.props;

		return (
			<View style={ _styles.container }>
				<TextInput
					placeholderTextColor  = {colors.placeholderTextColor}
					underlineColorAndroid = "transparent"
					{ ...otherProps }
					style                 = {_styles.input}
					placeholder           = {placeholder || "Nhập từ khoá"}
					multiline             = {false}
					editable              = {true}
					value                 = {value ? `${value}`: ""}
					ref                   = "input"
					onChangeText          = {onChangeText}
				/>
				<FAIcon name="search" style={ _styles.iconSearch }/>
			</View>
		);
	}
}

const _styles = {
	container: {
		borderColor: colors.primaryBorderColor,
		borderWidth: sizes.borderWidth,
		//marginVertical: sizes.margin,
		borderRadius: 18 * scale,
		paddingLeft: 8 * scale,
		paddingRight: 30 * scale,
		paddingVertical: 2 * scale,
		justifyContent: "center"
	},
	input: {
		color: colors.normalColor,
		padding: 0,
		fontSize: fontSizes.normal,
		height: 30 * scale,
		textAlignVertical: "center"
	},
	iconSearch: {
		fontSize: 20,
		position: "absolute",
		right: 8 * scale
	}
};

export default SearchInput;