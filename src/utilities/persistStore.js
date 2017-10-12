import { persistStore } from 'redux-persist';

export default async ( store, config: Object = {} ) => {

	return new Promise( ( res, rej ) => {

		persistStore( store, config, ( err, restoredState ) => {

			if( err ) {

				return rej( err );
			}

			return res( restoredState );
		} );
	} );
};