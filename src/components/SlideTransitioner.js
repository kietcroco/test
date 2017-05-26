/**
 * @flow
*/
import React from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';
import { Transitioner, addNavigationHelpers } from 'react-navigation';
import recursiveShallowEqual from '~/utilities/recursiveShallowEqual';

class SlideTransitioner extends React.PureComponent {

	static displayName = "@SlideTransitioner";

	static propTypes = {
		onTransitionStart: React.PropTypes.func,
		onTransitionEnd: React.PropTypes.func,
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
		screenProps: React.PropTypes.object
	};

	constructor( props ) {
		super(props);

		this._configureTransition = this._configureTransition.bind(this);
		this._renderScene = this._renderScene.bind(this);
		this._render = this._render.bind(this);

		this._screenDetails = {};
	}

	shouldComponentUpdate(nextProps) {

		const { navigation: { state: { index: nextIndex, routes: nextRoutes } }, screenProps: nextScreenProps } = nextProps;
		const { navigation: { state: { index, routes } }, screenProps } = this.props;

		return (
			index !== nextIndex ||
			!recursiveShallowEqual( routes, nextRoutes ) ||
			!recursiveShallowEqual( screenProps, nextScreenProps )
		);
	}

	/**
	 * @todo: Hàm config hiệu ứn
	 * @author: Croco
	 * @since: 17-5-2017
	*/
	_configureTransition( transitionProps, prevTransitionProps ) {

		return {
			timing: Animated.timing,
			duration: 250,
			easing: Easing.inOut(Easing.ease)
		};
	}

	_getScreenDetails( scene ) {
		const { screenProps, navigation, router } = this.props;

		let screenDetails = this._screenDetails[scene.key];

		if (!screenDetails || screenDetails.state !== scene.route) {

			const screenNavigation = addNavigationHelpers({
				...navigation,
				state: scene.route,
			});

			screenDetails = {
				state: scene.route,
				navigation: screenNavigation,
				options: router.getScreenOptions(screenNavigation, screenProps),
			};
			this._screenDetails[scene.key] = screenDetails;
		}
		return screenDetails;
	}

	/**
	 * @todo: Hàm tạo hiệu ứng các màn hình trước và sau khi chuyển
	 * @author: Croco
	 * @since: 17-5-2017
	*/
	_renderScene( transitionProps, scene ) {

		const { position } = transitionProps;
		const { index } = scene;
		const WIDTH = Dimensions.get('window').width;

		const translateX = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [WIDTH, 0, -WIDTH]
		});
		const Scene = this.props.router.getComponentForRouteName(scene.route.routeName);

		const navigation = addNavigationHelpers({
			...this.props.navigation,
			state: {
				...scene.route,
				index: scene.index,
				isActive: scene.isActive,
				isStale: scene.isStale
			}
		});

		return (
			<Animated.View style={[ _styles.container, {transform: [{ translateX }]}]} key={scene.key}>
				<Scene navigation={navigation} />
			</Animated.View>
		);
	}

	_render( transitionProps ) {

		const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene));
		return (
			<View style={ _styles.wrapper }>
				{scenes}
			</View>
		);
	}

	render() {
		
		return (
			<Transitioner
				configureTransition 	= {this._configureTransition}
				navigation 				= {this.props.navigation}
				render 					= {this._render}
				onTransitionStart 		= {this.props.onTransitionStart}
				onTransitionEnd 		= {this.props.onTransitionEnd}
			/>
		);
	}
}

const _styles = {
	wrapper: {
		flex: 1,
		position: "relative",
		flexDirection: "column"
	},
	container: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0
	}
};

export default SlideTransitioner;