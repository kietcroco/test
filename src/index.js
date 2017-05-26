/**
 * @flow
 */
 "use strict";
import React from 'react';
import { InteractionManager } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Navigator from './modules';
import ReducerRegistry from '~/library/ReducerRegistry';
import SplashScreen from 'react-native-smart-splash-screen';
import codePush from "react-native-code-push";
import thunk from 'redux-thunk';
//import { logger, rafScheduler, timeoutScheduler, vanillaPromise, readyStatePromise } from '~/middleware';
import { logger, routerNavigate, routerHistory } from '~/middleware';

class Application extends React.PureComponent {

	static displayName = '@application';
	constructor( props ) {
		super( props );

		this.store = createStore( ReducerRegistry.getReducers(), {}, compose(
			// next => (reducer, initialState, enhancer) => {

			// 	return next(reducer, initialState, enhancer);
			// },
			applyMiddleware(
				
				thunk,
				routerNavigate,
				routerHistory,
				// rafScheduler,
				// timeoutScheduler,
				// vanillaPromise,
				// readyStatePromise,
				logger
			)
		) );
	}
	
	render() {
		
		return (
			<Provider store={ this.store }>
				<Navigator />
			</Provider>
		);
	}

	componentDidMount() {

		InteractionManager.runAfterInteractions(() => setTimeout( () => {

			SplashScreen.close({
				animationType: SplashScreen.animationType.scale,
				duration: 850,
				delay: 500
			});
		}, 70 ));
	}
}

export default codePush( { checkFrequency: codePush.CheckFrequency.MANUAL } )( Application );