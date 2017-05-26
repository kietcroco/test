"use strict";
import { NavigationActions } from 'react-navigation';
import history from '~/library/history';

const rootNavigationKey = "$$navigation";

const getModuleName = ( path: String = "" ) => {

	const module = path.split("/");
	module.shift();

	return module[0];
};

/**
 * @todo: middleware custom navigation
 * @author: Croco
 * @since: 15-5-2017
*/
const routerHistory = store => next => {

	return action => {

		if( action.routeName ) {
			
			switch( action.type ) {

				case NavigationActions.INIT: 
				case NavigationActions.BACK: 
				case NavigationActions.SET_PARAMS: 
				case NavigationActions.URI: 
				case NavigationActions.NAVIGATE: 

				break;
			}
		}

		return next( action );
	};
};

export default routerHistory;