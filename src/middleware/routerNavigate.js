// "use strict";
// import { NavigationActions } from 'react-navigation';
// import serialize from '~/utilities/objectToQueryString';

// const rootNavigationKey = "$$navigation";

// const generateAction = ( routes, state, action ) => {

// 	if( routes && routes.length ) {

// 		const routeName = `/${routes.join('/')}`;
// 		routes.pop();

// 		const key = `${rootNavigationKey}${routeName}`;
// 		const navigationState = state[ key ];

// 		if( navigationState && navigationState.routes ) {

// 			const route = navigationState.routes[ navigationState.index ];

// 			if( route && route.routeName && route.routeName !== routeName ) {

// 				return {
// 					type: action.type,
// 					routeName,
// 					action: generateAction( routes, state, action )
// 				};
// 			}
// 		}
// 	}

// 	return action;
// };

// const fixAction = ( action, state ) => {

// 	if( action.routeName ) {

// 		const routes = action.routeName.split("/");
// 		if( routes.length > 2 ) {

// 			routes.shift();
// 			routes.pop();

// 			action = generateAction( routes, state, action );
// 		}
// 	}

// 	return action;
// };


// /**
//  * @todo: middleware custom navigation
//  * @author: Croco
//  * @since: 15-5-2017
// */
// const routerNavigate = store => next => {

// 	return action => {

// 		switch( action.type ) {

// 			// case NavigationActions.INIT: 
// 			// case NavigationActions.BACK: 
// 			// case NavigationActions.SET_PARAMS: 
// 			case NavigationActions.URI: 
// 			case NavigationActions.NAVIGATE: 

// 				// action = {
// 				// 	type: NavigationActions.NAVIGATE,
// 				// 	routeName: "/rivers/detail",
// 				// 	action: {
// 				// 		type: NavigationActions.NAVIGATE,
// 				// 		routeName: "/rivers/list",
// 				// 		action: {
// 				// 			type: NavigationActions.NAVIGATE,
// 				// 			routeName: "/rivers/list",
// 				// 		}
// 				// 	}
// 				// };
// 				// console.log( action );
// 		}

// 		return next( action );
// 	};
// };

// export default routerNavigate;