/**
 * @flow
*/
import React from 'react';
import { View, StatusBar } from 'react-native';
import { MenuContext } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import ReducerRegistry from '~/library/ReducerRegistry';
import { router, Navigator as Navigation } from './bootstrap';

// key reducer
const key = "$$navigation";

// component navigation
class Navigator extends React.PureComponent {

	static displayName = "@Navigator";

	shouldComponentUpdate(nextProps) {

		return (
			this.props.navigationState.index !== nextProps.navigationState.index
		);
	}

	render() {

		const { navigationState, dispatch, ...otherProps } = this.props;

		const navigation = addNavigationHelpers({
			dispatch,
			state: navigationState
		});

		return (
			<MenuContext style={ _styles.container }>
				<StatusBar backgroundColor="#2672ba"/>
				<Navigation { ...otherProps } navigation={ navigation }/>
			</MenuContext>
		);
	}
}

const _styles = {
	container: {
		flex: 1
	}
};

// đăng ký redux
ReducerRegistry.register( key, ( state, action ) => {

	return router.getStateForAction(action, state) || state;
});

// map state
export default connect( state => ({

	navigationState: state[ key ]
}) )( Navigator );