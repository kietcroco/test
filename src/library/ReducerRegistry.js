/**
 * @flow
 * @todo: static class Registry của reducer
 * @author: Croco
 * @since: 8-2-2017
 * @export
  * ReducerRegistry: Object
*/

"use strict";
import { combineReducers } from 'redux';

const _data = {

	reducers: {}, // danh sách reducer
	transformer: {}, // danh sách transformer
	emitChange: [] // danh sách hanlde change
};

const ReducerRegistry = Object.freeze({

	/**
	 * @todo: Hàm đăng ký reducer
	 * @author: Croco
	 * @since: 9-2-2017
	 * @params:
	  * key: String = path reducer
	  * reducer: Function = reducer redux
	  * transformer: Boolean | Object Function createTransform
	 * @return Object: { path: path reducer, reducer: reducer redux }
	*/
	register( key: String, reducer: Function, transformer = false ) {

		if( !key || !reducer ) return this;

		reducer.$$typeof = "reducer";
		reducer.$$key = key;
		
		_data.reducers[ key ] = reducer;
		_data.transformer[ key ] = transformer;

		let i;
		for( i in _data.emitChange ) {

			_data.emitChange[ i ]( key, reducer, transformer );
		}

		return reducer;
	},

	getReducers( key: String ) {

		if( key ) return _data.reducers[ key ];

		return combineReducers(_data.reducers);
	},

	get reducers() {

		return combineReducers(_data.reducers);
	},

	getTransformer( key: String ) {

		if( key ) return _data.transformer[ key ];

		return _data.transformer;
	},

	get transformer() {

		return _data.transformer;
	},

	/**
	 * @todo: Hàm đăng ký sự kiện change reducer
	 * @author: Croco
	 * @since: 9-2-2017
	 * @params:
	  * listener: Function = handle xử lý
	*/
	addChangeListener( listener: Function ) {

		if( typeof listener !== "function" ) {

			throw new Error('set listener ReducerRegistry error.');
		}

		_data.emitChange.push( listener );

		return this;
	},

	/**
	 * @todo: Hàm huỷ sự kiện change reducer
	 * @author: Croco
	 * @since: 9-2-2017
	 * @params:
	  * listener: Function = handle xử lý
	*/
	removeChangeListener( listener: Function ) {

		let index = _data.emitChange.indexOf( listener );
		if( index !== -1 ) {

			delete _data.emitChange[ index ];
		}

		return this;
	}
});

export default ReducerRegistry;