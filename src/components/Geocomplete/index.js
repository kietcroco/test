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
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';

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
					animating 		= {true}
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
					<Text numberOfLines={1}>
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

	render() {

		const { 
			visible,
			backHandle, 
			onRequestClose,
			placeholder,
			keepInput,
			children
		} = this.props;

		return (
			<Modal
				visible 		= { visible }
				animationType 	= "fade"
				onRequestClose 	= { this._onRequestClose }
			>
				<ModalHeader
					backHandle 			= { this._backHandle }
					backgroundColor 	= "rgba(38, 114, 186, 05)"
					color 				= "white"
					title 				= {
						<TextInput
							returnKeyType 			= "search"
							underlineColorAndroid 	= "transparent"
							style 					= { _styles.textInput }
							autoFocus 				= { true }
							selectTextOnFocus 		= { true }
							placeholder 			= { placeholder }
							onChangeText 			= { this._onChangeText }
							value 					= { this.state.text }
							placeholderTextColor 	= "#e2e2e2"
						/>
					}
				>
					{
						keepInput && <TouchableOpacity style={ _styles.btnApply } onPress={ this._applyHandle }>
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
				/>
				{children}
			</Modal>
		);
	}
}

const WIDTH = Dimensions.get('window').width;

const _styles = {
	textInput: {
		padding: 0,
		color: "white",
		borderBottomWidth: 0.5,
		borderBottomColor: "white",
		marginRight: 5
	},
	btnApply: {
		width: 30,
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	iconApply: {
		fontSize: 16,
		color: "white"
	},
	rowWrapper: {
		width: WIDTH - 10
	},
	row: {
		minWidth: WIDTH,
		height: 36,
		paddingLeft: 10,
		justifyContent: "center"
	},
	loader: {
		position: "absolute",
		right: 10,
		width: 20,
		height: 20
	},
	separator: {
		height: 0.1,
		borderBottomWidth: 1,
		borderBottomColor: '#c8c7cc'
	}
};

export default Geocomplete;