import _onRefresh from './_onRefresh';
import _onEndReached from './_onEndReached';
import componentDidMount from './componentDidMount';
import componentDidUpdate from './componentDidUpdate';

export default context => {

	context._onRefresh = _onRefresh.bind(context);
	context._onEndReached = _onEndReached.bind(context);
	context.componentDidMount = componentDidMount.bind(context);
	context.componentDidUpdate = componentDidUpdate.bind(context);
};