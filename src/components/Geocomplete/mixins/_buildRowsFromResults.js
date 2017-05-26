export default function ( results: Array = [], message: String, status: String = 'OK' ) {
	
	let predefinedPlaces = [];

	// nếu không có dữ liệu hoặc luôn cho phép render predefinedPlace
	if ( !results.length && this.props.predefinedPlacesAlwaysVisible && this.props.predefinedPlaces && this.props.predefinedPlaces.length ) {

		// khởi tạo các vị trí cần thêm vào đầu
		predefinedPlaces = this.props.predefinedPlaces.map( place => {

			return {
				...place,
				isPredefinedPlace: true,
			};
		});
	}

	// nếu cho phép lấy vị trí hiện tại
	if (!results.length && this.props.currentLocation === true) {

		// thêm vị trí hiện tại
		predefinedPlaces.unshift({
			description: this.props.currentLocationLabel,
			isCurrentLocation: true,
			isPredefinedPlace: true
		});
	}

	// thêm vào đầu mảng results
	predefinedPlaces.length && results.splice( 0, 0, ...predefinedPlaces );

	// gán dataSource
	this._dataSource = results;

	return results;
};