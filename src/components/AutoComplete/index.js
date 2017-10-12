"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, ListView, TextInput } from 'react-native';
import ModalHeader from '~/components/ModalHeader';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import validSource from './utils/validSource';
import buildSource from './utils/buildSource';
import { translate } from '~/utilities/language';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class AutoComplete extends React.Component {

	static displayName = "AutoComplete";

	static propTypes = {
		source: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string
				})
			])
		).isRequired, // data source
		onRequestClose: PropTypes.func, // sự kiện back
		onChange: PropTypes.func, // sự kiện change
		keepInput: PropTypes.bool,
		placeholder: PropTypes.string,
		children: PropTypes.node,
		visible: PropTypes.bool, // ẩn hoặc hiện
		value: PropTypes.string,
		maxLength: PropTypes.number,
		keyboardType: PropTypes.string
	};

	static defaultProps = {
		source: [],
		keepInput: false,
		placeholder: translate("Nhập"),
		value: ""
	};

	constructor( props ) {
		super( props );

		// tạo list data
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
			return r1 !== r2;
		}});

		this._dataSource = validSource( props.source );

		this.state = {
			text: "",
			dataSource: ds.cloneWithRows( this._dataSource )
		};

		this._renderRows = this._renderRows.bind( this );
		this._onChangeText = this._onChangeText.bind( this );
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.source != nextProps.source ) {
			
			this._dataSource = validSource( nextProps.source );
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows( this._dataSource )
			});
		}
		if( this.props.value !== nextProps.value && nextProps.value !== this.state.text ) {

			this._onChangeText( nextProps.value );
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		
		return (
			this.state.text !== nextState.text ||
			this.state.dataSource != nextState.dataSource ||
			this.props.visible !== nextProps.visible ||
			this.props.placeholder !== nextProps.placeholder
		);
	}

	_onChangeText( text: String = "" ) {

		this.setState({
			text,
			dataSource: this.state.dataSource.cloneWithRows( buildSource( text, this._dataSource ) )
		});
	}

	_renderRows( {label, value} ) {

		return (
			<TouchableOpacity style={ _styles.row } onPress={ () => this.props.onChange( label, value ) }>
				<Text style={ _styles.text }>{ label }</Text>
			</TouchableOpacity>
		);
	}

	render(){

		const { 
			visible, 
			onRequestClose, 
			children, 
			placeholder, 
			onChange, 
			keepInput,
			keyboardType,
			maxLength
		} = this.props;

		return (
			<Modal
				animationType 		= "fade"
				visible 			= { visible } 
				onRequestClose 		= { onRequestClose }
			>
				<ModalHeader
					backHandle 			= { onRequestClose }
					title 				= {
						<TextInput
							ref 					= "input"
							returnKeyType 			= "search"
							underlineColorAndroid 	= "transparent"
							style 					= { _styles.textInput }
							autoFocus 				= { true }
							selectTextOnFocus 		= { true }
							placeholder 			= { placeholder }
							onChangeText 			= { this._onChangeText }
							value 					= { this.state.text }
							placeholderTextColor 	= { colors.placeholderColor }
							maxLength 				= { maxLength }
							keyboardType 			= { keyboardType }
						/>
					}
				>	
					{
						keepInput && <TouchableOpacity hitSlop={ hitSlop } style={ _styles.btnApply } onPress={ () => onChange( this.state.text, this.state.text ) }>
							<FAIcon name="check" style={ _styles.iconApply }/>
						</TouchableOpacity>
					}
				</ModalHeader>

				<ListView
					dataSource 					= { this.state.dataSource }
					renderRow 					= { this._renderRows }
					initialListSize				= { 30 }
					pageSize 					= { 20 }
					scrollRenderAheadDistance	= { 40 }
					enableEmptySections 		= { true }
					keyboardDismissMode 		= "interactive"
					keyboardShouldPersistTap 	= "always"
					horizontal 					= { false }
					directionalLockEnabled 		= { true }
					style 						= { _styles.listView }
				/>
				{children}
			</Modal>
		);
	}
}

const _styles = {
	listView: {
		backgroundColor: colors.modalBackground
	},
	textInput: {
		padding: 0,
		color: colors.secondColor,
		borderBottomWidth: sizes.borderWidth,
		borderBottomColor: colors.secondColor,
		marginRight: sizes.spacing,
		fontSize: fontSizes.normal,
		height: "100%"
		//marginRight: 5
	},
	btnApply: {
		width: sizes.buttonNormal,
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	iconApply: {
		fontSize: fontSizes.large,
		color: colors.secondColor
	},
	row: {
		height: sizes.rowItemHeight,
		paddingHorizontal: sizes.margin,
		justifyContent: "center",
		borderBottomWidth: sizes.borderWidth,
		borderBottomColor: colors.primaryBorderColor
	},
	text: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default AutoComplete;
