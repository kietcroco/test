const recursiveShallowEqual = ( objA, objB ) => {

	if( typeof objA !== "object" || typeof objB !== "object" || objA === null || objB === null ) {

		return objA === objB;
	}

	const isArrayA = Array.isArray( objA );
	const isArrayB = Array.isArray( objB );

	if( isArrayA !== isArrayB ) {

		return false;
	}

	const lengthA = isArrayA ? objA.length : Object.keys( objA ).length;
	const lengthB = isArrayB ? objB.length : Object.keys( objB ).length;

	if( lengthA !== lengthB ) {

		return false;
	}

	let key;
	for( key in objA ) {

		if( !recursiveShallowEqual( objA[ key ], objB[ key ] ) ) {

			return false;
		}
	}

	return true;
};

export default recursiveShallowEqual;