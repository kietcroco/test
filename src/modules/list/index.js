import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';
import { namespace } from './constants';
import ReducerRegistry from '~/library/ReducerRegistry';
import { router, Navigator as Navigation } from './bootstrap';
import Header from '~/components/Header';
import SwipeExchange from './components/SwipeExchange';
import getModuleNameFromRoute from '~/utilities/getModuleNameFromRoute';

const key = "$$navigation" + namespace;

class Navigator extends React.PureComponent {
	
	static displayName = key;

	shouldComponentUpdate(nextProps) {

		const { 
			navigation: { state: nextState }, 
			navigationState: { index: nextIndex, routes: nextRoutes }
		} = nextProps;
		
		const { 
			navigation: { state }, 
			navigationState: { index, routes }
		} = this.props;

		return (
			nextIndex !== index ||
			!recursiveShallowEqual( state, nextState ) ||
			!recursiveShallowEqual( routes, nextRoutes )
		);
	}

	render() {

		const { navigationState, dispatch, ...otherProps } = this.props;

		const navigation = addNavigationHelpers({
			...this.props.navigation,
			state: navigationState
		});

		const navigationOptions = router.getScreenOptions( navigation );

		const moduleName = getModuleNameFromRoute( navigationState.routes[ navigationState.index ] );

		return (
			<View style={ _styles.container }>
				<Header 
					navigationOptions 		=	{ navigationOptions }
					navigation 				=	{ navigation }
					router 					= 	{ router }
				/>
				<Navigation { ...otherProps } navigation={navigation}/>
				<SwipeExchange onChange={ land => navigation.navigate("/list/" + land) }>{ moduleName }</SwipeExchange>
			</View>
		);
	}
}

const _styles = {
	container: {
		flex: 1,
		flexDirection: "column"
	}
};

ReducerRegistry.register( key, ( state, action ) => {

	return router.getStateForAction(action, state) || state;
});

export default connect( state => ({

	navigationState: state[ key ]
}) )( Navigator );