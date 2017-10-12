import Qs from 'qs';

/**
 * @todo: Hàm lấy thông tin json từ coords
 * @author: Croco
 * @since: 15-3-2017
 * @param: coords: vị trí, rowID: index row
*/
export default function( coords: Object, rowID: Number ) {
	
	// huỷ ajax
	this.abortRequests();

	// nếu có thông tin latitude, longitude
	if (coords.latitude !== undefined && coords.longitude !== undefined && coords.latitude !== null && coords.longitude !== null) {

		let url;

		// khởi tạo url api google place
		if ( this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding' ) {

			// your key must be allowed to use Google Maps Geocoding API
			url = 'https://maps.googleapis.com/maps/api/geocode/json?' + Qs.stringify({
				latlng: coords.latitude + ',' + coords.longitude,
				key: this.props.query.key,
				language: this.props.language || this.props.query.language,
				...this.props.GoogleReverseGeocodingQuery
			});
		} else {

			url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
				location: coords.latitude + ',' + coords.longitude,
				key: this.props.query.key,
				language: this.props.language || this.props.query.language,
				...this.props.GooglePlacesSearchQuery,
			});
		}

		// ajax
		this._request( url, responseJSON => { // callback khi ajax success

			if (Array.isArray(responseJSON.results)) {

				let results = responseJSON.results;

				// nếu là Geocoding và có yêu cầu filter type
				if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding' && this.props.filterReverseGeocodingByTypes && this.props.filterReverseGeocodingByTypes.length) {

					// lọc
					results = results.filter( value => {

						return this.props.filterReverseGeocodingByTypes.indexOf( value ) !== -1;
					} );
				}


				this.setState({
					dataSource: this.state.dataSource.cloneWithRows( this._buildRowsFromResults(results) )
				});
			} else {

				// huỷ loading
				this._loadingRow( rowID, false );
			}
		}, () => { // callback khi ajax error

			// huỷ loading
			this._loadingRow( rowID, false );
		} );
	} else {

		// huỷ loading
		this._loadingRow( rowID, false );
	}
};