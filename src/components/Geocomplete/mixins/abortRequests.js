/**
 * @todo: Hàm huỷ tất cả ajax
 * @author: Croco
 * @since: 15-3-2017
*/
export default function() {

	if( this._requests.length ) {

		this._requests.forEach( request => {

			request && request.abort();
		} );

		this._requests = [];
	}
};