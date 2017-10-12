export default function componentDidUpdate() {
	
	const { scene: { isActive = false } = {} } = this.props.navigation;
	if( !isActive ) {

		return;
	}

	const {
		refreshing,
		data = []
	} = this.props.reducers;

	if( !refreshing && data && typeof data[ data.length - 1 ] === "string" ) {

		setTimeout( () => this.listView && this.listView.scrollToEnd({animated: true}), 0);
	} else if( refreshing ) {

		setTimeout( () => this.listView && this.listView.scrollTo({x: 0, y: 0, animated: false}), 0);
	}
};