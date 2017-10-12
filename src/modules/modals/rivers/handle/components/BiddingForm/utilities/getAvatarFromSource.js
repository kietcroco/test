export default ( source: Object = {} ) => {

	// lấy hình trong avatar
	if( source.avatar && Array.isArray( source.avatar ) && source.avatar[0] && typeof source.avatar[0] === "string" ) {

		//FAKE
		//return String(source.avatar[0]).replace('izifix.com.local', 'api.izifix.com.local') || source.avatar[0];
		
		//REAL
		return source.avatar[0];
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

	// lấy logo cty
	if( 
		source.account &&
		Array.isArray( source.account.account_company_logo ) &&
		typeof source.account.account_company_logo[0] === "string"
	) {

		return source.account.account_company_logo[0];
	}

	return null;
};