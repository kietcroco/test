import Qs from 'qs';

/**
 * @todo: Hàm khi nhấn vào row
 * @author: Croco
 * @since: 15-3-2017
 * @param: rowData: dữ liệu row, rowID: index row
*/
export default function( rowData, rowID: Number ) {
	
	// nếu là vị trí lấy từ google place và cho phép lấy json chi tiết
	if ( rowData.isPredefinedPlace !== true && this.props.fetchDetails === true ) {

		if ( rowData.isLoading === true ) {

			// already requesting
			return;
		}

		// huỷ các ajax trước
		this.abortRequests();

		// loading
		this._loadingRow( rowID, true );

		// khởi tạo url api google place
		let url = 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
			key: this.props.query.key,
			placeid: rowData.place_id,
			language: this.props.query.language
		});

		// ajax
		this._request( 
			url, 
			responseJSON => { // callback khi success

				// huỷ loading
				this._loadingRow( rowID, false );

				// nếu thành công
				if( responseJSON && responseJSON.status === 'OK' ) {

					// trigger với data từ google
					this._onChange( rowData, responseJSON.result, this.state.text );

					return;
				}

				// trigger
				this._onChange( rowData, null, this.state.text );
			},
			() => {

				// huỷ loading
				this._loadingRow( rowID, false );
			}
		 );

	} else if( rowData.isCurrentLocation === true ) { // nếu là row vị trí hiện tại

		// loading
		this._loadingRow( rowID, true );

		// lấy vị trí hiện tại
		this._getCurrentLocation( rowID );

	} else {

		// huỷ loading
		this._loadingRow( rowID, false );

		// trigger
		this._onChange( rowData, null, this.state.text );
	}
};