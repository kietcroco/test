import alertUtil from '~/utilities/alert';
import { translate } from '~/utilities/language';

/**
 * @todo: Hàm lấy vị trí hiện tại
 * @author: Croco
 * @since: 15-3-2017
 * @param: rowID: index row
*/
export default function( rowID: Number ) {

	let options;

	// nếu yêu cầu lấy vị trí chính xác
	if( this.props.enableHighAccuracyLocation ) {

		options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 1000
		};
	}

	var isAbort = false;

	navigator.geolocation.getCurrentPosition(
		position => {

			if( isAbort ) return;

			if (this.props.nearbyPlacesAPI === 'None') {

				// rowData vị trí hiện tại
				let currentLocation = {
					description: this.props.currentLocationLabel,
					geometry: {
						location: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					}
				};

				// huỷ loading
				this._loadingRow( rowID, false );

				// trigger
				this._onChange( currentLocation, null, this.state.text );

			} else {

				// lấy thông tin chi tiết
				this._getNearby( position.coords, rowID );
			}
		},
		error => {

			if( isAbort ) return;

			// huỷ loading
			this._loadingRow( rowID, false );

			alertUtil({
				title: translate("Lỗi"),
				message: translate("Lấy vị trí thất bại")
			});
			
			//dev
		},
		options
	);

	this._requests.push({abort: () => {

		isAbort = true;

		// huỷ loading
		this._loadingRow( rowID, false );
	}});
};