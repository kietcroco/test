export default function ( rowID: Number ) {
	
	if( rowID ) {

		return this._dataSource[rowID];
	}

	return this._dataSource;
};