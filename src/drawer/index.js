/**
 * @flow
*/
import React from 'react';
import { connect } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import ReducerRegistry from '~/library/ReducerRegistry';
import Navigation from './navigation';
import addNavigationHelpers from '~/library/navigation/addNavigationHelpers';

// key reducer
const key = "$$navigation@drawer";

// component navigation
class Navigator extends React.Component {

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
				<Navigation { ...otherProps } navigation={ navigation }/>
			</MenuContext>
		);
	}
}

const _styles = {
	container: {
		flex: 1,
		backgroundColor: "white"
	}
};

// đăng ký redux
ReducerRegistry.register( key, ( state, action ) => {

	return Navigation.router.getStateForAction(action, state) || state;
});

// map state
export default connect( state => ({

	navigationState: state[ key ]
}) )( Navigator );