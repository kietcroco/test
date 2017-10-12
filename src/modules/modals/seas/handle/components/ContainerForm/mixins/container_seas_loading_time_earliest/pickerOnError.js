export default function onCancel(e) {

	this.setState({
		container_seas_loading_time_earliest: {
			...this.state.container_seas_loading_time_earliest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};