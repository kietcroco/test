export default function onCancel(e) {

	this.setState({
		product_rivers_loading_time_earliest: {
			...this.state.product_rivers_loading_time_earliest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};