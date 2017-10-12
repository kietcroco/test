export default function _onRefresh() {

	const { state: { params = {} } } = this.props.navigation;

	this.props.actions.fetchData(params, "init");
};