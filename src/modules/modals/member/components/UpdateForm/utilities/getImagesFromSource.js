export default ( source: Object = {} ) => {

	let images = [];
	if( source.images && Array.isArray( source.images ) ) {

		source.images.forEach( value => {

			if( Array.isArray( value ) && typeof value[0] === "string" ) {

				images.push( {
					source: value[0],
					info: {
						
					}
				} );
			}
		} );
	}
	return images;
};