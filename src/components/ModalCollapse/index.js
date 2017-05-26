/**
	<ModalCollapse
		visible 			= { this.state.visible }
		value 				= { this.state.value }
		source 				= { locationData }
		backHandle 			= { () => this.setState({visible: false}) }
		onRequestClose 		= { () => this.setState({visible: false}) }
		onChange 			= { ( label, value ) => {

			this.setState({
				visible: false,
				label,
				value
			});
		} }
		multiple
		//showParent
		geolocation
		searchToOther
		keepInput
	></ModalCollapse>
*/
import React from 'react';
import {
	Modal,
	ListView
} from 'react-native';
import ModalHeader from '~/components/ModalHeader';
import SearchBar from './components/SearchBar';
import Item from './components/Item';
import ItemOther from './components/ItemOther';
import Group from './components/Group';
import Footer from './components/Footer';
import mixins from './mixins';
import propTypes from './propTypes';
import defaultProps from './defaultProps';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';

class ModalCollapse extends React.Component {

	static displayName = '@ModalCollapse';

	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor( props ) {
		super( props );
		mixins(this);

		// tạo list data
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
			
			if( 
				r1 !== r2 ||
				r1.checked !== r2.checked ||
				r1.collapsed !== r2.collapsed ||
				r1.isInput !== r2.isInput ||
				r1.isHidden !== r2.isHidden ||
				r1.children !== r2.children ||
				r1.otherValue !== r2.otherValue ||
				r1.otherLabel !== r2.otherLabel ||
				r1.value !== r2.value ||
				r1.label !== r2.label
			) {
				
				return true;
			}

			return false;
		}});

		this.state = {
			dataSource: ds.cloneWithRows( this._buildData( props.value ) ),
			searchKeyword: "",
			searchValue: "",
			isSearching: false
		};

		this._renderRows = this._renderRows.bind(this);
		this._renderRow = this._renderRow.bind(this);
		this._renderGroup = this._renderGroup.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if( nextProps.visible && this.props.visible !== nextProps.visible ) {

			if( !recursiveShallowEqual(this.props.value, nextProps.value) || !recursiveShallowEqual(this.props.source, nextProps.source) ) {
				
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows( this._buildData( nextProps.value ) )
				});
			}

			this.setState({
				searchKeyword: "",
				searchValue: ""
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (
			this.state.isSearching !== nextState.isSearching ||
			this.state.searchValue !== nextState.searchValue ||
			this.state.searchKeyword !== nextState.searchKeyword ||
			this.state.dataSource._dataBlob.s1 != nextState.dataSource._dataBlob.s1 ||
			this.props.visible !== nextProps.visible
		);
	}

	_renderRow( rowData, sectionID, rowID, highlightRow, levels: Array = [], multiple: Boolean = this.props.multiple ) {

		if( rowData.isOther ) {

			return (
				<ItemOther 
					onPress 		= { () => this._onPressItemOther( rowData, sectionID, rowID, levels ) }
					key 			= { `${rowID}-${levels.join('-')}-${rowData.label}` }
					multiple 		= { multiple }
					checked 		= { rowData.checked }
					isSelectAll 	= { rowData.isSelectAll }
					autoCheck 		= { rowData.autoCheck }
					isHot 			= { rowData.isHot }
					isOther 		= { rowData.isOther }
					level 			= { levels.length }
					label 			= { rowData.otherLabel || rowData.label }
					otherValue 		= { rowData.otherValue }
					isInput 		= { rowData.isInput }
					onChange 		= { (value, geoCode, keyword) => this._onPressOtherOK( rowData, sectionID, rowID, levels, {value, geoCode, keyword} ) }
					geolocation 	= { this.props.geolocation }
					keepInput 		= { this.props.keepInput }
				/>
			);
		}

		return (
			<Item 
				onPress 		= { () => this._onPressItem( rowData, sectionID, rowID, levels ) }
				key 			= { `${rowID}-${levels.join('-')}-${rowData.label}` }
				multiple 		= { multiple }
				checked 		= { rowData.checked }
				isSelectAll 	= { rowData.isSelectAll }
				autoCheck 		= { rowData.autoCheck }
				isHot 			= { rowData.isHot }
				isOther 		= { rowData.isOther }
				level 			= { levels.length }
				label 			= { rowData.label }
			/>
		);
	}

	_renderGroup( rowData, sectionID, rowID, highlightRow, levels: Array = [] ) {

		const multiple = rowData.hasOwnProperty('isMulti') ? rowData.isMulti : this.props.multiple;
		levels.push( rowData.value );

		return (
			<Group 
				onPress 		= { () => this._onPressGroup( rowData, sectionID, rowID, levels ) }
				key 			= { `${rowID}-${levels.join('-')}-${rowData.label}` }
				multiple 		= { multiple }
				opened 			= { !rowData.collapsed }
				checked 		= { rowData.checked }
				isSelectAll 	= { rowData.isSelectAll }
				autoCheck 		= { rowData.autoCheck }
				isHot 			= { rowData.isHot }
				isOther 		= { rowData.isOther }
				level 			= { levels.length }
				label 			= { rowData.isOther && rowData.otherLabel || rowData.label }
			>
				{
					rowData.children.map( _rowData => this._renderRows( _rowData, sectionID, rowID, highlightRow, levels, multiple ) )
				}
			</Group>
		);
	}

	_renderRows( rowData, sectionID, rowID, highlightRow, levels: Array = [], multiple: Boolean = this.props.multiple ) {

		rowData.rowID = rowID;
		rowData.multiple = multiple;

		if( (this.state.isSearching && rowData.isHidden) ) return null;
		
		if( rowData.children && Array.isArray( rowData.children ) ) {

			return this._renderGroup( rowData, sectionID, rowID, highlightRow, levels );
		}
		return this._renderRow( rowData, sectionID, rowID, highlightRow, levels, multiple );
	}

	render() {

		const {
			visible,
			multiple,
			title,
			geolocation,
			searchToOther,
			keepInput
		} = this.props;

		return (
			<Modal
				visible 		= { visible }
				animationType 	= "fade"
				onRequestClose 	= { this._onRequestClose }
			>
				<ModalHeader 
					backHandle 			= { this._backHandle }
					title 				= { title }
				/>
				<SearchBar
					onSearch 			= { this._onSearch }
					keyword 			= { this.state.searchKeyword }
					value 				= { this.state.searchValue }
					geolocation 		= { geolocation }
					searchToOther 		= { searchToOther }
					keepInput 			= { keepInput }
				/>
				<ListView
					dataSource 					= { this.state.dataSource }
					renderRow 					= { this._renderRows }
					initialListSize				= { 30 }
					pageSize 					= { 20 }
					scrollRenderAheadDistance	= { 40 }
					enableEmptySections 		= { true }
					keyboardDismissMode 		= "interactive"
					keyboardShouldPersistTap 	= "always"
				/>
				<Footer
					clearHandle 	= { this._clearHandle }
					applyHandle 	= { this._applyHandle }
				/>
			</Modal>
		);
	}
}

export default ModalCollapse;