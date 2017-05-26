/**
 * @todo: Hàm render waiting
 * @author: Croco
 * @since: 15-3-2017
*/
export default function() {
	this.setState({
		dataSource: this.state.dataSource.cloneWithRows(this._buildRowsFromResults( [{isWaiting: true}] ))
	});
};