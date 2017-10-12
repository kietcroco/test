export default function onCancel(e) {

	this.setState({
		product_roads_loading_time_latest: {
			...this.state.product_roads_loading_time_latest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};