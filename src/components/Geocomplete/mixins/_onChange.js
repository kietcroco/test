/**
 * @todo: Hàm trigger change
 * @author: Croco
 * @since: 15-3-2017
 * @param: rowData: dữ liệu hiển thị, geoCode: json place
*/
export default function ( rowData: Object, geoCode: Object, keyword: String = "" ) {

	// gán lại giá trị
	let value = this._getAddress( rowData );

	if( 
		this.props.onChange && 
		(
			this.props.value !== value || 
			JSON.stringify( this.props.geoCode ) !== JSON.stringify( geoCode ) ||
			this.props.keyword !== keyword
		)
	) {

		// trigger
		this.props.onChange( value, geoCode, keyword );
	}

	// ẩn modal
	this.hide();
};