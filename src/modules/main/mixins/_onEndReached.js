export default function _onEndReached(e) {

	const { scene: { isActive = false } = {} } = this.props.navigation;

	if( !isActive ) {

		return;
	}

	const {
		reducers: {
			refreshing,
			data = []
		},
		navigation: {
			state: {
				params = {}
			} = {}
		}
	} = this.props;

	//const { Exchange = "" } = params;

	if( !refreshing && e && data[ data.length - 1 ] !== "loading" ) {

		this.props.actions.fetchData(params, "nextPage");
	}
};