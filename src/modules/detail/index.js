import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { namespace } from './constants';
import ReducerRegistry from '~/library/ReducerRegistry';
import { router, Navigator as Navigation } from './bootstrap';
import Header from '~/components/Header';

const key = "$$navigation" + namespace;

class Navigator extends React.PureComponent {
	
	render() {

		const { navigationState, dispatch, ...otherProps } = this.props;

		const navigation = addNavigationHelpers({
			...this.props.navigation,
			state: navigationState
		});

		const navigationOptions = router.getScreenOptions( navigation );

		return (
			<View style={ _styles.container }>
				<Header 
					navigationOptions 		=	{ navigationOptions }
					navigation 				=	{ navigation }
					router 					= 	{ router }
				/>
				<Navigation { ...otherProps } navigation={navigation}/>
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