export default function onCancel(e) {

	this.setState({
		product_rivers_loading_time_latest: {
			...this.state.product_rivers_loading_time_latest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};