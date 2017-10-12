"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput as Input, TouchableOpacity, ActivityIndicator } from 'react-native';
import Tag from './Tag';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { colors, backgroundColors } from './constants';
import { sizes, colors as _colors, fontSizes, scale } from '~/configs/styles';

class TagsInput extends React.Component {

	static displayName = "TagsInput";

	static propTypes = {
		style: PropTypes.object,
		separate: PropTypes.string, // dấu phân tách nhiều value
		label: PropTypes.string,
		value: PropTypes.string, // giá trị được phân nhau bởi separate (;)
		required: PropTypes.bool,
		placeholder: PropTypes.string,
		inputStyle: PropTypes.object, // css cho input
		containerStyle: PropTypes.object, // css cho container
		labelStyle: PropTypes.object, // css cho label
		tagsStyle: PropTypes.object, // css cho tag
		onChangeText: PropTypes.func,
		onEndEditing: PropTypes.func,
		onRemove: PropTypes.func, // sự kiện khi xoá 1 value
		editable: PropTypes.bool, // cho phép nhập
		regex: PropTypes.instanceOf( RegExp ).isRequired, // regex test value
		messageType: PropTypes.oneOf([ // trạng thái của input
			null,
			"success",
			"error",
			"warning",
			"loading"
		]),
		children: PropTypes.oneOfType([ // thông báo lỗi
			PropTypes.string,
			PropTypes.node
		]),
		onChange: PropTypes.func // event change
	};

	static defaultProps = {
		editable: true,
		separate: ";",
		value: "",
		required: false,
		placeholder: "",
		messageType: null
	};

	constructor( props ) {
		super( props );

		this.state = {
			value: props.value || "",
			text: ""
		};
	}

	componentWillReceiveProps( nextProps ) {

		if( this.props.value !== nextProps.value && nextProps.value !== this.state.value ) {

			this.setState({
				value: nextProps.value
			});
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {
		
		return (
			this.state.text !== nextState.text ||
			this.state.value !== nextState.value ||
			this.props.messageType !== nextProps.messageType ||
			this.props.children != nextProps.children ||
			this.props.label !== nextProps.label ||
			this.props.selection != nextProps.selection ||
			this.props.secureTextEntry !== nextProps.secureTextEntry ||
			this.props.caretHidden !== nextProps.caretHidden ||
			this.props.selectTextOnFocus !== nextProps.selectTextOnFocus ||
			this.props.blurOnSubmit !== nextProps.blurOnSubmit ||
			this.props.returnKeyType !== nextProps.returnKeyType ||
			this.props.required !== nextProps.required ||
			this.props.editable !== nextProps.editable ||
			this.props.placeholder !== nextProps.placeholder ||
			this.props.keyboardType !== nextProps.keyboardType ||
			this.props.autoFocus !== nextProps.autoFocus ||
			this.props.maxLength !== nextProps.maxLength ||
			this.props.autoCapitalize !== nextProps.autoCapitalize ||
			this.props.autoCorrect !== nextProps.autoCorrect ||
			this.props.defaultValue !== nextProps.defaultValue
		);
	}

	focus() {

		return this.refs.input.focus();
	}
	blur() {

		return this.refs.input.blur();
	}
	update(...args) {

		return this.refs.input.update(...args);
	}

	isFocused() {

		return this.refs.input.isFocused();
	}

	clear() {

		return this.refs.input.clear();
	}

	render() {

		const { 
			style,
			placeholder, 
			inputStyle, 
			containerStyle, 
			labelStyle,
			tagsStyle,
			required,
			label,
			regex,
			separate,
			onChangeText,
			onEndEditing,
			onRemove,
			editable,
			messageType,
			children,
			onChange,
			...otherProps 
		} = this.props;

		const tags = this.state.value.split( separate ).filter( v => (v && v.length) );

		const color = colors[ messageType ];
		const iconName = iconNames[ messageType ];

		var paddingRight = 0;
		if( iconName || messageType === "loading" ) {

			paddingRight = 30;
		}

		const borderColor = !!color && {
			borderColor: color
		};

		return (
			<View style={ style }>
				<View style={[ _styles.container, containerStyle, !!paddingRight && {paddingRight}, borderColor, !editable && {
					backgroundColor: _colors.disableColor
				} ]}>
					{
						!!label &&
							<View style={ _styles.labelWrapper }>
								<Text numberOfLines={1} style={ labelStyle ? [ _styles.label, labelStyle ] : _styles.label }>{ label }</Text>
								{ !!required && <Text style={ _styles.required }> *</Text> }
							</View>
					}
					<View style={ _styles.row }>
						{
							tags.map( (v, i) => {

								if( !v ) return null;

								return (
									<Tag 
										key             = { `tag-${i}` }
										style 			= { tagsStyle }
										messageType     = { regex.test( v ) ? "success" : "error" }
										onRemove        = { () => {

											let newValue = this.state.value;
											newValue = newValue.replace( new RegExp(`${ v }\\${ separate }?`) , "");
											this.setState({
												value: newValue
											});
											onRemove && onRemove(v);
											onChange && onChange( newValue );
										} }
									>{ v }</Tag>
								);
							} )
						}
						
						<Input
							selectTextOnFocus 			= { true }
							underlineColorAndroid 		= "transparent"
							placeholderTextColor 		= { _styles.placeholderTextColor }
							{...otherProps}
							style 						= { [_styles.input, inputStyle, editable && !!this.state.text && !regex.test( this.state.text ) && {
								backgroundColor: backgroundColors["error"]
							}] }
							placeholder 				= { placeholder }
							multiline 					= { false }
							editable 					= { editable }
							value 						= { this.state.text }
							ref 						= "input"
							blurOnSubmit 				= { true }
							onChangeText 				= { text => {

								this.setState({text});
								onChangeText && onChangeText(text);
							} }
							onEndEditing 				= { e => {

								if( regex.test( this.state.text ) ) {

									let newValue = this.state.value;
									newValue = newValue.split( separate ).filter( v => (v && v.length) );
									newValue.push( this.state.text );
									newValue = newValue.join( separate );

									this.setState({
										value: newValue,
										text: ""
									}, () => {
										this.refs.input.focus();
									});

									onChange && onChange( newValue );
								}

								onEndEditing && onEndEditing(e);
							} }
						/>
						
					</View>
					<View style={ _styles.messageIcon }>
						{
							!!iconName ? 
								<FAIcon name={ iconName } style={ [_styles.iconFeedback, !!color && {
									color
								}] }/> :
							(
								messageType === "loading" ?
									<ActivityIndicator /> : null
							)
						}
					</View>
				</View>
				{ 
					!!children && typeof children === "string" ?
						<Text style={{
							color: color ? color : _colors.normalColor
						}}>{ children }</Text> :
					children || null
				}
			</View>
		)
	}
}

const iconNames = {
	success: "check",
	warning: "exclamation",
	error: "times"
};

const inputHeight = 30 * scale;

const _styles = {
	placeholderTextColor: _colors.placeholderColor,
	container: {
		//flex: 1,
		borderWidth: sizes.borderWidth,
		borderColor: _colors.primaryBorderColor,
		borderRadius: sizes.borderRadius,
		paddingHorizontal: 8 * scale,
		position: "relative",
		justifyContent: "center"
	},
	messageIcon: {
		position: "absolute",
		right: sizes.margin
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center"
	},
	input: {
		flex: 1,
		color: colors.normalColor,
		padding: 0,
		fontSize: fontSizes.normal,
		height: inputHeight,
		textAlignVertical: "center"
	},
	labelWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	label: {
		color: _colors.normalColor,
		fontSize: fontSizes.small,
		textAlignVertical: "center"
	},
	required: {
		color: _colors.required,
		fontSize: fontSizes.normal,
		textAlignVertical: "center"
	},
	iconFeedback: {
		fontSize: 16 * scale,
		color: colors.boldColor
	},
};

export default TagsInput;