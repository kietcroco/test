"use strict";
import { NavigationActions } from 'react-navigation';
import history from '~/library/history';
import serialize from '~/utilities/objectToQueryString';

const rootNavigationKey = "$$navigation";

const getModuleName = ( path: String = "" ) => {

	return path.split("/")[0];
};

const fixAction = ( store, action ) => {

	if( action.routeName ) {

		// lấy state của navigation tab ( root )
		const rootNavigationState = store.getState()[ rootNavigationKey ];

		let route =  rootNavigationState.routes[ rootNavigationState.index ];

		if( route && route.routes ) {
			
			route = route.routes[ route.index ];

			const moduleName = getModuleName( action.routeName );
			
			// nếu route root khác với route của action
			if( getModuleName( route.routeName ) !== moduleName ) {

				// push tới root mới
				return {
					...action,
					action: {
						type: action.type,
						routeName: "/" + moduleName,
						action: action.action
					}
				};
			}
		}
	}

	return action;
};

const getLocationFromAction = ( action, locations = [] ) => {

	const check = locations.length && locations.findIndex( location => location.pathname.includes( action.routeName ) ) !== -1;

	if( !check ) {

		locations.push({
			pathname: action.routeName,
			state: action.params,
			search: action.params ? serialize( action.params ) : ""
		});
	}

	if( action.action ) {

		locations = getLocationFromAction( action.action, locations );
	}

	return locations;
};

const push = action => {

	const locations = getLocationFromAction( action );

	locations.forEach( location => history.push( location ) );
};

const back = action => {

	if( history.canGo(-1) ) {

		history.goBack();
	}
};

/**
 * @todo: middleware custom navigation
 * @author: Croco
 * @since: 15-5-2017
*/
const routerNavigate = store => next => {

	return action => {


		switch( action.type ) {

			case NavigationActions.INIT: 

				//push( action );
				break;
			case NavigationActions.BACK: 

				//back( action );
				break;
			// case NavigationActions.SET_PARAMS: 
			// case NavigationActions.URI: 
			case NavigationActions.NAVIGATE: 

				action = fixAction( store, action );
				//push( action );

				return next( action );
		}

		return next( action );
	};
};

export default routerNavigate;