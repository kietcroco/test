import hide from './hide';
import _onRequestClose from './_onRequestClose';
import _backHandle from './_backHandle';
import _onChangeText from './_onChangeText';
import resetCache from './resetCache';
import abortRequests from './abortRequests';
import _request from './_request';
import _getSuggestions from './_getSuggestions';
import _buildRowsFromResults from './_buildRowsFromResults';
import _emptyList from './_emptyList';
import _loadingRow from './_loadingRow';
import _getDataSource from './_getDataSource';
import _getCurrentLocation from './_getCurrentLocation';
import _getNearby from './_getNearby';
import _waitingList from './_waitingList';
import _getAddress from './_getAddress';
import _onPress from './_onPress';
import _onChange from './_onChange';
import _applyHandle from './_applyHandle';

export default context => {

	context._requests = []; // hàng đợi request

	context._cache = {}; // cache

	context._dataSource = []; // data
	
	context.hide = hide.bind( context ); // hàm ẩn modal
	context._onRequestClose = _onRequestClose.bind( context ); // backhandle
	context._backHandle = _backHandle.bind( context ); // khi nhấn nút back
	context.resetCache = resetCache.bind( context ); // xoá cache
	context.abortRequests = abortRequests.bind( context ); // huỷ ajax
	context._request = _request.bind( context ); // tạo ajax
	context._getSuggestions = _getSuggestions.bind( context ); // hiện gợi ý
	context._buildRowsFromResults = _buildRowsFromResults.bind( context ); // build source
	context._emptyList = _emptyList.bind( context ); // render list rỗng
	context._loadingRow = _loadingRow.bind( context ); // render loading cho row
	context._getDataSource = _getDataSource.bind( context ); // lấy source
	context._getCurrentLocation = _getCurrentLocation.bind( context ); // lấy vị trí hiện tại
	context._getNearby = _getNearby.bind( context ); // 
	context._waitingList = _waitingList.bind( context ); // loading cho list
	context._onChangeText = _onChangeText.bind( context ); // khi nhập input
	context._getAddress = _getAddress.bind( context ); // lấy địa chỉ từ geocode
	context._onPress = _onPress.bind( context ); // khi nhấn vào row
	context._onChange = _onChange.bind( context ); // khi thay đổi giá trị
	context._applyHandle = _applyHandle.bind( context ); // nút áp dụng
};