import React from 'react';
import { 
	View, 
	Text,
	Modal, 
	ScrollView, 
	Dimensions,
	ListView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import propTypes from './propTypes';
import mixins from './mixins';
import defaultProps from './defaultProps';
import ModalHeader from '~/components/ModalHeader';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { sizes, colors, fontSizes, scale, hitSlop } from '~/configs/styles';

class Geocomplete extends React.Component {

	static displayName = "@Geocomplete";

	static propTypes = propTypes;

	static defaultProps = defaultProps;

	constructor( props ) {
		super( props );
		mixins( this );

		// tạo list data
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
			return r1 !== r2;
		}});

		this.state = {
			dataSource: ds.cloneWithRows( this._buildRowsFromResults( [] ) ),
			text: props.keyword || props.value // giá trị ô input
		};

		this._renderRow = this._renderRow.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( this.props.visible !== nextProps.visible && nextProps.visible ) {

			const text = nextProps.keyword || nextProps.value;

			if( text !== this.state.text ) {

				this.setState({
					text
				});
			}

			this._getSuggestions( text );
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.text !== nextState.text ||
			this.props.language !== nextProps.language ||
			this.state.dataSource._dataBlob.s1 != nextState.dataSource._dataBlob.s1 ||
			!recursiveShallowEqual(this.props, nextProps)
		);
	}

	/**
	 * @todo: Hàm render row
	 * @author: Croco
	 * @since: 14-3-2017
	 * @param: rowData: dữ liệu, sectionID: index group, rowID: index row
	 * @return: <ScrollView>
	*/
	_renderRow( rowData: Object, sectionID, rowID, highlightRow: (sectionID: Number, rowID: Number) => void ) {

		// nếu là waiting list
		if( rowData.isWaiting ) {

			return (

				<ActivityIndicator
					animating 		= { true }
					size 			= "large"
				/>
			);
		}

		return (
		
			<ScrollView
				keyboardDismissMode 			= "interactive"
				keyboardShouldPersistTap 		= "always"
				horizontal 						= { true }
				showsHorizontalScrollIndicator 	= { false }
				showsVerticalScrollIndicator 	= { false }
				style 							= { _styles.rowWrapper }
			>
				<TouchableOpacity style={ _styles.row } onPress={ () => this._onPress( rowData, rowID ) }>
					<Text numberOfLines={1} style={ _styles.label }>
						{ this._getAddress( rowData ) }
					</Text>
					{
						rowData.isLoading && 
							<ActivityIndicator
								animating 		= {true}
								size 			= "small"
								style 			= { _styles.loader }
							/>
					}
				</TouchableOpacity>
			</ScrollView>
		);
	}

	/**
	 * @todo: Hàm render phân cách dòng
	 * @author: Croco
	 * @since: 14-3-2017
	 * @param: sectionID: index group, rowID: index row
	 * @return: <View>
	*/
	_renderSeparator( sectionID: String = "s1", rowID: Number ) {

		return <View style={ _styles.separator } key={ `separator-${sectionID}-${rowID}` }/>
	}

	componentDidUpdate( prevProps ) {

		if( prevProps.visible !== this.props.visible && this.props.visible ) {

			this.refs.input.focus();
		}
	}

	render() {

		const { 
			visible,
			backHandle, 
			onRequestClose,
			placeholder,
			keepInput,
			children,
			maxLength,
			keyboardType
		} = this.props;

		return (
			<Modal
				visible 		= { visible }
				animationType 	= "fade"
				onRequestClose 	= { this._onRequestClose }
			>
				<ModalHeader
					backHandle 			= { this._backHandle }
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
						keepInput && <TouchableOpacity hitSlop={ hitSlop } style={ _styles.btnApply } onPress={ this._applyHandle }>
							<FAIcon name="check" style={ _styles.iconApply }/>
						</TouchableOpacity>
					}
				</ModalHeader>

				<ListView
					dataSource 					= { this.state.dataSource }
					renderRow 					= { this._renderRow }
					renderSeparator 			= { this._renderSeparator }
					initialListSize				= { 30 }
					pageSize 					= { 20 }
					scrollRenderAheadDistance	= { 40 }
					enableEmptySections 		= { true }
					keyboardDismissMode 		= "interactive"
					keyboardShouldPersistTap 	= "always"
					horizontal 					= { false }
					directionalLockEnabled 		= { true }
					showsHorizontalScrollIndicator	= { false }
					showsVerticalScrollIndicator	= { true }
					style 						= { _styles.listView }
				/>
				{children}
			</Modal>
		);
	}
}

const WIDTH = Dimensions.get('window').width;

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
	rowWrapper: {
		width: WIDTH - 10
	},
	row: {
		minWidth: WIDTH,
		height: sizes.rowItemHeight,
		paddingLeft: sizes.margin,
		justifyContent: "center"
	},
	loader: {
		position: "absolute",
		right: sizes.margin,
		width: 20 * scale,
		height: 20 * scale
	},
	separator: {
		height: sizes.borderWidth,
		backgroundColor: colors.primaryBorderColor
		//borderBottomWidth: sizes.borderWidth,
		//borderBottomColor: colors.primaryBorderColor
	},
	label: {
		fontSize: fontSizes.normal,
		color: colors.normalColor
	}
};

export default Geocomplete;