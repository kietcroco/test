/**
 * @todo: Hàm render list rỗng
 * @author: Croco
 * @since: 14-3-2017
*/
export default function() {
	
	this.setState({
		dataSource: this.state.dataSource.cloneWithRows(this._buildRowsFromResults( [] ))
	});
	this.abortRequests();
};