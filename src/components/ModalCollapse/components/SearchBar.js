"use strict";
import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Geocomplete from '~/components/Geocomplete';
import { translate } from '~/utilities/language';

class SearchBar extends React.Component {

	static displayName = "@SearchBar";

	static propTypes = {
		placeholder: React.PropTypes.string,
		onSearch: React.PropTypes.func,
		geolocation: React.PropTypes.bool,
		searchToOther: React.PropTypes.bool,
		keepInput: React.PropTypes.bool
	};

	static defaultProps = {
		placeholder: translate("Tìm tỉnh, thành phố"),
		geolocation: false,
		searchToOther: false,
		keepInput: false
	};

	constructor( props ) {
		super( props );

		this.state = {
			visible: false,
			value: props.value,
			keyword: props.keyword
		};

		this._onRequestClose = this._onRequestClose.bind(this);
		this._onPress = this._onPress.bind(this);
		this._onChange = this._onChange.bind(this);
		this._onChangeText = this._onChangeText.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( nextProps.value !== this.state.value ) {

			this.setState({
				value: nextProps.value
			});
		}

		if( nextProps.keyword !== this.state.keyword ) {

			this.setState({
				keyword: nextProps.keyword
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.visible !== nextState.visible ||
			this.state.value !== nextState.value ||
			this.state.keyword !== nextState.keyword ||
			this.props.placeholder !== nextProps.placeholder ||
			this.props.geolocation !== nextProps.geolocation ||
			this.props.searchToOther !== nextProps.searchToOther ||
			this.props.keepInput !== nextProps.keepInput ||
			this.props.onSearch != nextProps.onSearch
		);
	}

	_onRequestClose() {

		this.state.visible && this.setState({
			visible: false
		});
	}

	_onPress() {

		!this.state.visible && this.setState({
			visible: true
		});
	}

	_onChange( value: String = "", geoCode: Object = null, keyword: String = "" ) {

		if( this.props.geolocation ) {

			this.state.visible && this.setState({
				visible: false,
				value,
				keyword
			}, () => {

				this.props.onSearch && this.props.onSearch( value, geoCode, keyword );
			});
		} else if( this.props.searchToOther ){

			this.props.onSearch && this.props.onSearch( value, geoCode, keyword );
		}
	}

	_onChangeText( text: String = "" ) {

		this.setState({
			value: text
		});

		if( !this.props.searchToOther && this.props.onSearch ) {

			this.props.onSearch( text );
		}
	}
	
	render() {

		const {
			placeholder,
			value,
			keyword,
			geolocation,
			searchToOther,
			keepInput
		} = this.props;

		return (
			<View style={ _styles.container }>
				<TouchableOpacity activeOpacity={ 1 } style={ _styles.textInputWrapper } onPress={ geolocation ? this._onPress : undefined }>
					<FAIcon name="search" style={ _styles.iconSearch }/>
					{
						geolocation ?
							<Text numberOfLines={1} style={ !this.state.value && _styles.placeholder }>{ this.state.value || placeholder }</Text>
						: <TextInput 
								style 					= { _styles.textInput }
								returnKeyType 			= {searchToOther ? "done" :"search"}
								underlineColorAndroid 	= "transparent"
								selectTextOnFocus 		= { true }
								placeholder 			= { placeholder }
								placeholderTextColor 	= "#adadad"
								onChangeText 			= { this._onChangeText }
								value 					= { this.state.value }
								onSubmitEditing 		= { ({nativeEvent: {text}}) => this._onChange(text) } 
						  />
					}
				</TouchableOpacity>
				{
					geolocation && 
					<Geocomplete 
						visible 		= { this.state.visible }
						onRequestClose 	= { this._onRequestClose }
						backHandle 		= { this._onRequestClose }
						onChange 		= { this._onChange }
						keyword 		= { this.state.keyword }
						value 			= { this.state.value }
						keepInput 		= { keepInput }
					/>
				}
			</View>
		);
	}
}

const _styles = {
	container: {
		height: 35,
		backgroundColor: "#f4f4f4",
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: "center",
		borderBottomColor: "#b7b6b6",
		borderBottomWidth: 0.5
	},
	textInputWrapper: {
		height: 22,
		backgroundColor: "white",
		borderWidth: 0.5,
		borderColor: "#cacaca",
		position: "relative",
		justifyContent: "center",
		paddingLeft: 22
	},
	iconSearch: {
		position: "absolute",
		left: 5,
		fontSize: 15,
		color: "#bcbbbc"
	},
	placeholder: {
		color: "#adadad"
	},
	textInput: {
		flex: 1,
		padding: 0
	}
};

export default SearchBar;