/**
 * @flow
*/
import React from 'react';
import { connect } from 'react-redux';
import ReducerRegistry from '~/library/ReducerRegistry';
import Navigation from './navigation';
import recursiveShallowEqual from '~/library/recursiveShallowEqual';
import addNavigationHelpers from '~/library/navigation/addNavigationHelpers';

// key reducer
const key = "$$navigation";

// component navigation
class Navigator extends React.Component {

	static displayName = key;

	shouldComponentUpdate(nextProps) {

		return (
			recursiveShallowEqual( this.props.screenProps, nextProps.screenProps ) ||
			recursiveShallowEqual( this.props.navigationState, nextProps.navigationState )
		);
	}

	render() {

		const { navigationState, dispatch, ...otherProps } = this.props;

		const navigation = addNavigationHelpers({
			dispatch,
			state: navigationState
		});

		return (

			<Navigation { ...otherProps } navigation={ navigation }/>
		);
	}
}

// đăng ký redux
ReducerRegistry.register( key, ( state, action ) => {

	return Navigation.router.getStateForAction(action, state) || state;
});

// map state
export default connect( state => ({

	navigationState: state[ key ]
}) )( Navigator );