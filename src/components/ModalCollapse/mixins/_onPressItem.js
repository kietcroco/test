import checkItem from '../utils/checkItem';
import removeItem from '../utils/removeItem';
import uncheckAll from '../utils/uncheckAll';

export default function( rowData, sectionID, rowID, levels ) {

	var dataSource = this._dataSource.slice();

	if( !rowData.checked ) {

		dataSource = checkItem( rowData, dataSource, levels );
		
	} else if( rowData.multiple ){

		rowData.checked = false;

		// nếu là phần tử được insert vào sau thì remove bỏ
		if( rowData.isInsert ) {

			dataSource = removeItem( rowData, levels, dataSource );
		}
	}

	dataSource[ rowID ] = {...dataSource[ rowID ]};

	this.setState({
		dataSource: this.state.dataSource.cloneWithRows( dataSource )
	});

	this._dataSource = dataSource;
	
	if( !rowData.multiple && rowData.checked ) {

		this._applyHandle();
	}
};