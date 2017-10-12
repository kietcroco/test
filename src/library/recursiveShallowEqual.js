/**
 * @todo: Hàm đệ quy so sánh 2 object xem các phần tử có giống nhau hay không
 * @author: Croco
 * @since: 31-5-2017
 * @return: bool
*/
const recursiveShallowEqual = ( objA, objB ) => {

	// nếu không phải object
	if( typeof objA !== "object" || typeof objB !== "object" || objA === null || objB === null ) {
								// NaN != NaN
		return objA === objB || ( objA !== objA && objB !== objB );
	}

	// detect mảng
	const isArrayA = Array.isArray( objA );
	const isArrayB = Array.isArray( objB );

	if( isArrayA !== isArrayB ) {

		return false;
	}

	// độ dài 2 object
	const lengthA = isArrayA ? objA.length : Object.keys( objA ).length;
	const lengthB = isArrayB ? objB.length : Object.keys( objB ).length;

	if( lengthA !== lengthB ) {

		return false;
	}

	// duyệt từng phần tử
	let key;
	for( key in objA ) {

		// đệ quy
		if( !recursiveShallowEqual( objA[ key ], objB[ key ] ) ) {

			return false;
		}
	}

	return true;
};

export default recursiveShallowEqual;