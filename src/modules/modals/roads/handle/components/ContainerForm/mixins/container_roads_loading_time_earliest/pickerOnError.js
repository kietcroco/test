export default function onCancel(e) {

	this.setState({
		container_roads_loading_time_earliest: {
			...this.state.container_roads_loading_time_earliest,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};