import React from 'react';

class NoneTransitioner extends React.PureComponent {

	static displayName = "@NoneTransitioner";

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
		screenProps: React.PropTypes.object
	};

	render() {

		const { navigation: { state: {index, routes} }, router } = this.props;

		const Component = router.getComponentForRouteName( routes[index].routeName );

		return (
			<Component {...this.props}/>
		);
	}
}

export default NoneTransitioner;