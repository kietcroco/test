import Qs from 'qs';

/**
 * @todo: Hàm lấy gợi ý từ google place
 * @author: Croco
 * @since: 14-3-2017
 * @param: text: keyword
*/
export default function( text: String = "" ) {

	// huỷ các request trước đó
	this.abortRequests();

	// khởi tạo url api google place
	let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' + encodeURIComponent(text) + '&' + Qs.stringify(this.props.query);

	// ajax
	this._request( 
		url, 
		responseJSON => { // callback success

			if( responseJSON ) {

				let status = responseJSON.status;

				// success
				if( status === "OK" || status === "ZERO_RESULTS" ) {

					if ( Array.isArray( responseJSON.predictions ) ) {

						this.setState({
							dataSource: this.state.dataSource.cloneWithRows( this._buildRowsFromResults( responseJSON.predictions, responseJSON.error_message, status ) )
						});

						return;
					}
				}

				// error
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows( this._buildRowsFromResults( responseJSON.predictions, responseJSON.error_message, status ) )
				});

			} else {

				// render list rỗng
				this._emptyList();
			}
		},
		() => {

			// render list rỗng
			this._emptyList();
		}
	);
};