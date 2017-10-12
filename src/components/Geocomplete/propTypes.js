import PropTypes from 'prop-types';

export default {
	style: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	query: PropTypes.shape({ // parameter google place
		key: PropTypes.string,
		language: PropTypes.string, // https://developers.google.com/maps/faq#languagesupport
		types: PropTypes.oneOfType([ // https://developers.google.com/places/web-service/autocomplete#place_types
			PropTypes.string,
			PropTypes.array
		])
	}),
	predefinedPlacesAlwaysVisible: PropTypes.bool, // cho phép luôn luôn hiển thị danh sách vị trí được cấu hình sẵn
	predefinedPlaces: PropTypes.arrayOf( // danh sách vị trí cấu hình sẳn
		PropTypes.shape({
			description: PropTypes.string.isRequired, // tên hiển thị
			geometry: PropTypes.shape({ // location
				location: PropTypes.shape({
					lat: PropTypes.number.isRequired,
					lng: PropTypes.number.isRequired
				}).isRequired
			}).isRequired,
			formatted_address: PropTypes.string, // tên hiển thị
			name: PropTypes.string // tên hiển thị
		})
	),
	fetchDetails: PropTypes.bool, // cho phép lấy dữ liệu geocode chi tiết
	currentLocation: PropTypes.bool, // cho phép lấy bị trí hiện tại
	enableHighAccuracyLocation: PropTypes.bool, // cho phép lấy chính xác ( vừa gps vừa mạng )
	currentLocationLabel: PropTypes.string, // label vị trí hiện tại
	nearbyPlacesAPI: PropTypes.oneOf([
		"GooglePlacesSearch", // https://maps.googleapis.com/maps/api/place/nearbysearch
		"GoogleReverseGeocoding", // https://maps.googleapis.com/maps/api/geocode
		"None"
	]),
	GooglePlacesSearchQuery: PropTypes.object, // Optional parameters https://developers.google.com/places/web-service/search#Optional parameters
	GoogleReverseGeocodingQuery: PropTypes.object, // Optional parameters https://developers.google.com/places/web-service/search#Optional parameters
	timeout: PropTypes.number, // request timeout
	onTimeout: PropTypes.func, // event timeout
	minLength: PropTypes.number, // độ dài tối thiểu để get place
	filterReverseGeocodingByTypes: PropTypes.array, // lọc vị trí thuộc loại
	value: PropTypes.string, // giá trị khởi tạo
	geoCode: PropTypes.shape({ // json google place
		description: PropTypes.string, // tên hiển thị
		geometry: PropTypes.shape({ // location
			location: PropTypes.shape({
				lat: PropTypes.number.isRequired,
				lng: PropTypes.number.isRequired
			}).isRequired
		}).isRequired,
		formatted_address: PropTypes.string.isRequired, // tên hiển thị
		name: PropTypes.string // tên hiển thị
	}),
	onRequestClose: PropTypes.func.isRequired, // handle khi nhấn phím back của android
	keepInput: PropTypes.bool, // cờ cho phép không lấy từ goole place
	keyword: PropTypes.string, // từ khoá để tìm được
	visible: PropTypes.bool, // hiển thị
	children: PropTypes.node,
	backHandle: PropTypes.func.isRequired, // handle nút back
	placeholder: PropTypes.string, // placeholder search input
	onChange: PropTypes.func, // event change
	onChangeText: PropTypes.func, // sự kiện nhập input
	maxLength: PropTypes.number,
	keyboardType: PropTypes.string,
	language: PropTypes.string // ngôn ngữ ( cùng prop query )
};