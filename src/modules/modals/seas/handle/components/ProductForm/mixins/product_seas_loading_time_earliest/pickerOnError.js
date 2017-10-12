export default function onCancel(e) {

	this.setState({
		product_seas_loading_time_earliest: {
			...this.state.product_seas_loading_time_earliest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};