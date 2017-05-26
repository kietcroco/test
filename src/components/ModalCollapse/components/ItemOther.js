import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Radio from '~/components/Radio';
import Checkbox from '~/components/CheckBox';
import Geocomplete from '~/components/Geocomplete';
import { translate } from '~/utilities/language';

class ItemOther extends React.PureComponent {

	static displayName = '@ModalCollapseItemOther';

	static propTypes = {
		onPress: React.PropTypes.func,
		label: React.PropTypes.string.isRequired,
		multiple: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		isSelectAll: React.PropTypes.bool,
		autoCheck: React.PropTypes.bool,
		isHot: React.PropTypes.bool,
		isOther: React.PropTypes.bool,
		level: React.PropTypes.number,
		otherValue: React.PropTypes.string,
		otherLabel: React.PropTypes.string,
		onChange: React.PropTypes.func,
		isInput: React.PropTypes.bool,
		geolocation: React.PropTypes.bool,
		geoCode: React.PropTypes.object,
		keyword: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		keepInput: React.PropTypes.bool
	};

	static defaultProps = {
		multiple: false,
		checked: false,
		isSelectAll: false,
		autoCheck: false,
		isHot: false,
		isOther: false,
		level: 1,
		otherValue: "",
		otherLabel: "",
		isInput: false,
		geolocation: false,
		geoCode: null,
		keyword: "",
		placeholder: translate("Nhập tỉnh khác"),
		keepInput: false
	};

	constructor( props ) {
		super( props );

		this.state = {
			otherValue: props.otherValue,
			visible: false,
			geoCode: props.geoCode,
			keyword: props.keyword
		};

		this._onChangeText = this._onChangeText.bind(this);
		this._onPressOK = this._onPressOK.bind(this);
		this._onPressGeo = this._onPressGeo.bind(this);
		this._onRequestClose = this._onRequestClose.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.otherValue !== nextProps.otherValue && nextProps.otherValue !== this.state.otherValue ) {

			this.setState({
				otherValue: nextProps.otherValue
			});
		}

		if( this.props.geoCode != nextProps.geoCode && nextProps.geoCode != this.state.geoCode ) {

			this.setState({
				geoCode: nextProps.geoCode
			});
		}

		if( this.props.keyword != nextProps.keyword && nextProps.keyword != this.state.keyword ) {
			
			this.setState({
				keyword: nextProps.keyword
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.visible !== nextState.visible ||
			this.state.otherValue !== nextState.otherValue ||
			this.state.keyword !== nextState.keyword ||
			this.state.geoCode != nextState.geoCode ||
			this.props.label !== nextProps.label ||
			this.props.otherLabel !== nextProps.otherLabel ||
			this.props.multiple !== nextProps.multiple ||
			this.props.checked !== nextProps.checked ||
			this.props.isSelectAll !== nextProps.isSelectAll ||
			this.props.autoCheck !== nextProps.autoCheck ||
			this.props.isHot !== nextProps.isHot ||
			this.props.isInput !== nextProps.isInput ||
			this.props.isOther !== nextProps.isOther ||
			this.props.level !== nextProps.level ||
			this.props.geolocation !== nextProps.geolocation ||
			this.props.placeholder !== nextProps.placeholder ||
			this.props.keepInput !== nextProps.keepInput ||
			this.props.onChange != nextProps.onChange ||
			this.props.onPress != nextProps.onPress
		);
	}

	_onChangeText( otherValue ) {
		this.setState({
			otherValue
		});
	}

	_onPressOK() {

		this.props.onChange && this.props.onChange( this.state.otherValue, this.state.geoCode, this.state.keyword );
	}

	_onRequestClose() {

		this.state.visible && this.setState({
			visible: false
		});
	}

	_onPressGeo() {

		!this.state.visible && this.setState({
			visible: true
		});
	}

	_onChange( value, geoCode, keyword ) {

		this.setState({
			otherValue: value,
			geoCode,
			keyword,
			visible: false
		});
	}

	_renderOther() {

		if( this.props.geolocation ) {

			return ([
				<TouchableOpacity onPress={ this._onPressGeo } activeOpacity={1} style={ _styles.otherInput } key="input-other">
					<Text numberOfLines={1} style={ !this.state.otherValue && _styles.placeholder }>
						{this.state.otherValue || this.props.placeholder}
					</Text>
				</TouchableOpacity>,
				<TouchableOpacity key="touch-other" style={ _styles.btnOK } onPress={ this._onPressOK }>
					<Text style={ _styles.labelOK }>OK</Text>
				</TouchableOpacity>,
				<Geocomplete 
					key 			= "geo-other"
					visible 		= { this.state.visible }
					onRequestClose 	= { this._onRequestClose }
					backHandle 		= { this._onRequestClose }
					onChange 		= { this._onChange }
					keyword 		= { this.state.keyword }
					value 			= { this.state.otherValue }
					keepInput 		= { this.props.keepInput }
				/>
			]);
		}

		return ([
			<TextInput 
				style 					= { _styles.otherInput }
				underlineColorAndroid 	= "transparent"
				value 					= { this.state.otherValue }
				onChangeText 			= { this._onChangeText }
				autoFocus 				= { true }
				selectTextOnFocus 		= { true }
				key 					= "input-other"
			/>,
			<TouchableOpacity key="touch-other" style={ _styles.btnOK } onPress={ this._onPressOK }>
				<Text style={ _styles.labelOK }>OK</Text>
			</TouchableOpacity>
		]);
	}

	render() {

		const { 
			onPress,
			label,
			multiple,
			checked,
			level,
			isInput,
			otherLabel,
			geolocation
		} = this.props;

		const paddingLeft = { paddingLeft: (level + 1) * 10 };

		return (

			<TouchableOpacity onPress={ onPress } style={ [_styles.container, paddingLeft] }>
				<Text numberOfLines={1}>{ otherLabel || label }</Text>
				{
					isInput &&
						<View style={ [_styles.otherInputWrapper, paddingLeft] }>
							{ this._renderOther() }
						</View>
				}
				{
					multiple ? 
						<Checkbox checked={ checked }/> : 
						<Radio checked={ checked } />
				}
			</TouchableOpacity>
		);
	}
}

const _styles = {
	container: {
		height: 36,
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomColor: "#e5e5e5",
		borderBottomWidth: 0.5,
		paddingRight: 15,
		flexDirection: "row",
		position: "relative"
	},
	otherInputWrapper: {
		position: "absolute",
		right: 40,
		flexDirection: "row",
		top: 0,
		left: 0,
		bottom: 0,
		justifyContent: "center",
		paddingTop: 5,
		paddingBottom: 5
	},
	otherInput: {
		flex: 1,
		padding: 0,
		backgroundColor: "white",
		borderWidth: 0.5,
		borderColor: "#ccc",
		borderRadius: 5,
		justifyContent: "center"
	},
	btnOK: {
		width: 30,
		height: "100%",
		backgroundColor: "#dddddd",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		marginLeft: 10
	},
	
	placeholder: {
		color: "#adadad"
	}
};

export default ItemOther;