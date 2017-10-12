export default function onCancel(e) {

	this.setState({
		container_seas_loading_time_latest: {
			...this.state.container_seas_loading_time_latest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};