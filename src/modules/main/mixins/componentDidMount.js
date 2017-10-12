import { InteractionManager } from 'react-native';

export default function componentDidMount() {

	InteractionManager.runAfterInteractions(() => {
		const { state: { params = {} } } = this.props.navigation;

		this.props.actions.fetchData(params, "init");
	});
};