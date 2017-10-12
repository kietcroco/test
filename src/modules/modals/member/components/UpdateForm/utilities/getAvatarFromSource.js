export default ( source: Object = {} ) => {

	// lấy hình trong avatar
	if( source.avatar && Array.isArray( source.avatar ) && source.avatar[0] && typeof source.avatar[0] === "string" ) {

		return source.avatar[0];
	}

	// lấy logo cty
	if( 
		Array.isArray( source.account_company_logo ) &&
		typeof source.account_company_logo[0] === "string"
	) {

		return source.account_company_logo[0];
	}

	// lấy hình đầu tiên trong ghi chú
	if( 
		source.images && 
		Array.isArray( source.images ) && 
		source.images[0] && 
		source.images[0][0] && 
		typeof source.images[0][0] === "string" 
	) {

		return source.images[0][0];
	}

	return null;
};