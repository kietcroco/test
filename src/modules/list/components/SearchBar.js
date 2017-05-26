import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Category from './Category';
import ModalCollapse from '~/components/ModalCollapse';
import ModalCategory from './ModalCategory';
import CategorySelect from './CategorySelect';
import getModuleNameFromRoute from '~/utilities/getModuleNameFromRoute';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';
import { translate } from '~/utilities/language';

class SearchBar extends React.Component {
	
	static displayName = '@SearchBar';

	static propTypes = {
		navigation: React.PropTypes.shape({
			dispatch: React.PropTypes.func.isRequired,
			goBack: React.PropTypes.func,
			navigate: React.PropTypes.func,
			setParams: React.PropTypes.func,
			state: React.PropTypes.shape({
				params: React.PropTypes.shape({
					Exchange: React.PropTypes.string,
					type: React.PropTypes.string,
					areasArr: React.PropTypes.array
				}),
				routeName: React.PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
	};

	constructor( props ) {
		super( props );

		// tên sàn
		this._moduleName = getModuleNameFromRoute( props.navigation.state );

		// source config khu vực
		const sourceArea = this._loadRegions( this._moduleName );

		// khu vực mặc định
		this._defaultArea = [ sourceArea[0] ];

		this.state = {
			modalCategoryVisible: false, // modal chọn sàn
			modalAreaVisible: false, // modal chọn khu vực
			sourceCategory: this._loadCategory( this._moduleName ), // source config sàn con
			sourceArea,
			areaLabel: this._defaultArea[0].label // label hiển thị của khu vực
		};

		this._onRequestClose = this._onRequestClose.bind(this);
		this._categoryOnPress = this._categoryOnPress.bind(this);
		this._categoryOnChange = this._categoryOnChange.bind(this);
		this._areaOnPress = this._areaOnPress.bind(this);
		this._areaOnChange = this._areaOnChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		const moduleName = getModuleNameFromRoute( nextProps.navigation.state );
		if( moduleName !== this._moduleName ) {

			this._moduleName = moduleName;
			const sourceArea = this._loadRegions( this._moduleName );

			this.setState({
				sourceCategory: this._loadCategory( this._moduleName ),
				sourceArea,
				modalCategoryVisible: false,
				modalAreaVisible: false
			});

			this._defaultArea = [ sourceArea[0] ];
		}
	}

	shouldComponentUpdate( nextProps, nextState ) {

		return (
			!recursiveShallowEqual( this.state, nextState ) ||
			!recursiveShallowEqual( this.props.navigation.state, nextProps.navigation.state )
		);
	}

	/**
	 * @todo: Hàm load data khu vực theo sàn
	*/
	_loadRegions( moduleName: String = "rivers" ) {

		switch( moduleName ) {
			case "rivers": 
			default:
				return require('~/data/regions/rivers');
		}
	}

	/**
	 * @todo: Hàm load danh mục theo sàn
	*/
	_loadCategory( moduleName: String = "rivers" ) {

		switch( moduleName ) {
			case "rivers": 
			default:
				return require('~/data/category/rivers');
		}
	}

	/**
	 * @todo: Hàm đóng 2 modal
	*/
	_onRequestClose() {

		this.setState({
			modalCategoryVisible: false,
			modalAreaVisible: false
		});
	}

	/**
	 * @todo: Mở modal chọn danh mục
	*/
	_categoryOnPress() {

		this.setState({
			modalCategoryVisible: true
		});
	}

	/**
	 * @todo: Thay đổi danh mục
	*/
	_categoryOnChange( Exchange: String = "", type: String = "" ) {

		this.setState({
			modalCategoryVisible: false
		});

		this.props.navigation.setParams({
			...this.props.navigation.state.params,
			Exchange,
			type
		});
	}

	/**
	 * @todo: Mở modal khu vực
	*/
	_areaOnPress() {

		this.setState({
			modalAreaVisible: true
		});
	}

	/**
	 * @todo: Thay đổi khu vực
	*/
	_areaOnChange( areaLabel: String = "", value: Array = [] ) {

		this.setState({
			modalAreaVisible: false,
			areaLabel
		});

		this.props.navigation.setParams({
			...this.props.navigation.state.params,
			areasArr: value.map( area => area.value )
		});
	}

	render() {

		const { state: { params: { Exchange = "", type = "", areasArr = [] } = {} } } = this.props.navigation;

		// tên sàn con
		const categoryName = this.state.sourceCategory[ Exchange ] ? this.state.sourceCategory[ Exchange ].label : "Tất cả";

		// khu vực
		const areaValues = areasArr.map( area => ({value: area}) );

		return (
			<View style={ _styles.container }>
				<View style={ _styles.areaContainer }>
					<CategorySelect onPress={ this._areaOnPress } style={ _styles.area }>{ this.state.areaLabel }</CategorySelect>
					<CategorySelect onPress={ this._categoryOnPress } style={ _styles.category }>{ categoryName }</CategorySelect>
					<CategorySelect style={ _styles.filter }>{ translate("Lọc") }</CategorySelect>
					<ModalCategory 
						visible 		= { this.state.modalCategoryVisible }
						onRequestClose 	= { this._onRequestClose }
						source 			= { this.state.sourceCategory[""].category }
						activeName 		= { Exchange }
						onChange 		= { this._categoryOnChange }
					/>
					<ModalCollapse
						visible 			= { this.state.modalAreaVisible }
						value 				= { areaValues }
						defaultValue 		= { this._defaultArea }
						source 				= { this.state.sourceArea }
						backHandle 			= { this._onRequestClose }
						onRequestClose 		= { this._onRequestClose }
						onChange 			= { this._areaOnChange }
						multiple
						//showParent
						geolocation
						searchToOther
						keepInput
					></ModalCollapse>
				</View>
				<Category source={ this.state.sourceCategory } navigation={ this.props.navigation }/>
			</View>
		);
	}
}

const _styles = {
	container: {
		backgroundColor: "#2673bb",
	},
	areaContainer: {
		flexDirection: "row"
	},
	area: {
		width: "40%",
		borderLeftWidth: 0
	},
	category: {
		width: "45%",
		borderLeftWidth: 0,
		borderRightWidth: 0
	},
	filter: {
		width: "15%",
		borderRightWidth: 0
	}
};

export default SearchBar;