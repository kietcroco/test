/**
 * @todo: Hàm render loading row
 * @author: Croco
 * @since: 14-3-2017
 * @param: rowID: index row, status: trạng thái loading, dataSource: Array
*/
export default function( rowID: Number, status: Boolean = false, dataSource: Array ) {

	// nếu có truyền dataSource thì không setState
	let isSetState = !dataSource;

	// clone data source
	dataSource = dataSource ? dataSource : this._getDataSource().slice();

	if( dataSource[ rowID ] ) {

		// clone row
		let rowData = { ...dataSource[ rowID ] };

		// set loading
		rowData.isLoading = status;

		dataSource[ rowID ] = rowData;

		// render
		isSetState && this.setState({
			dataSource: this.state.dataSource.cloneWithRows( dataSource )
		});
	}

	return dataSource;
};