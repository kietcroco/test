/**
 * @flow
*/
import React from 'react';
import { Dimensions } from 'react-native';
import { DrawerView } from 'react-navigation';
import DrawerContent from './DrawerContent';

class Drawer extends React.PureComponent {

	static displayName = "@Drawer";

	static propTypes = {
		navigation: React.PropTypes.shape({
			dispatch: React.PropTypes.func.isRequired,
			goBack: React.PropTypes.func,
			navigate: React.PropTypes.func,
			setParams: React.PropTypes.func,
			state: React.PropTypes.shape({
				index: React.PropTypes.number.isRequired,
				routes: React.PropTypes.arrayOf( React.PropTypes.shape({
					index: React.PropTypes.number,
					key: React.PropTypes.string.isRequired,
					routeName: React.PropTypes.string.isRequired
				}) )
			}).isRequired,
		}).isRequired,
		router: React.PropTypes.shape({
			getActionForPathAndParams: React.PropTypes.func,
			getComponentForRouteName: React.PropTypes.func.isRequired,
			getComponentForState: React.PropTypes.func,
			getPathAndParamsForState: React.PropTypes.func,
			getScreenOptions: React.PropTypes.func,
			getStateForAction: React.PropTypes.func
		}).isRequired,
		screenProps: React.PropTypes.object,
		drawerPosition: React.PropTypes.oneOf([ // hướng drawer
			"left",
			"right"
		]),
		drawerWidth: React.PropTypes.number // độ rộng drawer
	};

	static defaultProps = {
		drawerPosition: "left"
	};

	shouldComponentUpdate(nextProps) {

		const { navigation: { state: { index: nextIndex } }, drawerPosition: nextDrawerPosition, drawerWidth: nextDrawerWidth } = nextProps;
		const { navigation: { state: { index } }, drawerPosition, drawerWidth } = this.props;

		return (
			index !== nextIndex ||
			drawerPosition !== nextDrawerPosition ||
			drawerWidth !== nextDrawerWidth
		);
	}

	render() {

		const { drawerPosition, drawerWidth, ...otherProps } = this.props;

		return (
			<DrawerView 
				{ ...otherProps }
				drawerWidth 		= { drawerWidth || Dimensions.get('window').width - 56 }
				contentComponent 	= { DrawerContent }
				drawerPosition 		= { drawerPosition }
			/>
		);
	}
}

export default Drawer;