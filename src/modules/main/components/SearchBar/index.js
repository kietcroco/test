import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Category from './Category';
import ModalCollapse from '~/components/ModalCollapse';
import ModalCategory from './ModalCategory';
import CategorySelect from './CategorySelect';
import getModuleNameFromRoute from '~/utilities/getModuleNameFromRoute';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import { translate } from '~/utilities/language';
import { colors } from '~/configs/styles';

import mapCurrentLanguage from '~/utilities/mapCurrentLanguageToProps';

class SearchBar extends React.Component {

	static displayName = '@SearchBar';

	static propTypes = {
		navigation: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		// tên sàn
		this._moduleName = getModuleNameFromRoute(props.navigation.state);

		// source config khu vực
		const sourceArea = this._loadRegions(this._moduleName);

		// khu vực mặc định
		this._defaultArea = [sourceArea[0]];

		this.state = {
			modalCategoryVisible: false, // modal chọn sàn
			modalAreaVisible: false, // modal chọn khu vực
			sourceCategory: this._loadCategory(this._moduleName), // source config sàn con
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

		const moduleName = getModuleNameFromRoute(nextProps.navigation.state);
		if (moduleName !== this._moduleName) {

			this._moduleName = moduleName;
			const sourceArea = this._loadRegions(this._moduleName);

			this.setState({
				sourceCategory: this._loadCategory(this._moduleName),
				sourceArea,
				modalCategoryVisible: false,
				modalAreaVisible: false
			});

			this._defaultArea = [sourceArea[0]];
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.props.currentLanguage !== nextProps.currentLanguage ||
			!recursiveShallowEqual(this.state, nextState) ||
			!recursiveShallowEqual(this.props.navigation.state, nextProps.navigation.state)
		);
	}

	/**
	 * @todo: Hàm load data khu vực theo sàn
	*/
	_loadRegions(moduleName: String = "rivers") {

		switch (moduleName) {
			case "seas":
				return require('~/data/regions/seas');
			case "roads":
				return require('~/data/regions/roads');
			case "rivers":
			default:
				return require('~/data/regions/rivers');
		}
	}

	/**
	 * @todo: Hàm load danh mục theo sàn
	*/
	_loadCategory(moduleName: String = "rivers") {

		switch (moduleName) {
			case "seas":
				return require('~/data/category/seas');
			case "roads":
				return require('~/data/category/roads');
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
	_categoryOnChange(Exchange: String = "", type: String = "") {

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
	_areaOnChange(areaLabel: String = "", value: Array = []) {

		this.setState({
			modalAreaVisible: false,
			areaLabel
		});

		this.props.navigation.setParams({
			...this.props.navigation.state.params,
			areasArr: value.map(area => area.value)
		});
	}

	render() {

		const { state: { params: { Exchange = "", type = "", areasArr = [] } = {} } } = this.props.navigation;

		// tên sàn con
		const categoryName = this.state.sourceCategory[Exchange] ? this.state.sourceCategory[Exchange].label : (this._moduleName == "seas" ? translate("#$seas$#Tất cả") : translate("Tất cả"));

		// khu vực
		const areaValues = areasArr.map(area => ({ value: area }));

		// có phải sàn con
		const isCategoryActive = !Exchange;

		return (
			<View style={_styles.container}>
				<View style={_styles.areaContainer}>
					<CategorySelect onPress={this._areaOnPress} style={_styles.area}>{this.state.areaLabel}</CategorySelect>
					<CategorySelect onPress={this._categoryOnPress} style={ isCategoryActive ? _styles.category : _styles.categoryActive}>{ translate( categoryName ) }</CategorySelect>
					<CategorySelect style={_styles.filter}>{ this._moduleName == "seas" ? translate("#$seas$#Lọc") : translate("Lọc")}</CategorySelect>
					<ModalCategory
						visible        = {this.state.modalCategoryVisible}
						onRequestClose = {this._onRequestClose}
						source         = {this.state.sourceCategory[""].category}
						activeName     = {Exchange}
						onChange       = {this._categoryOnChange}
					/>
					<ModalCollapse
						visible        = {this.state.modalAreaVisible}
						value          = {areaValues}
						defaultValue   = {this._defaultArea}
						source         = {this.state.sourceArea}
						backHandle     = {this._onRequestClose}
						onRequestClose = {this._onRequestClose}
						onChange       = {this._areaOnChange}
						onInit         = {this._areaOnChange}
						title          = { this._moduleName == "seas" ? translate("#$seas$#Chọn khu vực") : translate("Chọn khu vực") }
						placeholder    = { this._moduleName == "seas" ? translate("#$seas$#Tìm tỉnh, thành phố") : translate("Tìm tỉnh, thành phố") }
						labelApply 	   = { this._moduleName == "seas" ? translate("#$seas$#Áp dụng") : translate("Áp dụng") }
						labelClear 	   = { this._moduleName == "seas" ? translate("#$seas$#Bỏ chọn") : translate("Bỏ chọn") }
						multiple
						//showParent
						geolocation
						searchToOther
						keepInput
					></ModalCollapse>
				</View>
				<Category source={this.state.sourceCategory} navigation={this.props.navigation} />
			</View>
		);
	}
}

const _styles = {
	container: {
		backgroundColor: colors.primaryColor
	},
	areaContainer: {
		flexDirection: "row"
	},
	area: {
		width: "38%",
		borderLeftWidth: 0
	},
	category: {
		width: "42%",
		borderLeftWidth: 0,
		borderRightWidth: 0
	},
	categoryActive: {
		width: "42%",
		borderLeftWidth: 0,
		borderRightWidth: 0,
		backgroundColor: colors.activeColor
	},
	filter: {
		width: "20%",
		borderRightWidth: 0
	}
};

export default mapCurrentLanguage(SearchBar);