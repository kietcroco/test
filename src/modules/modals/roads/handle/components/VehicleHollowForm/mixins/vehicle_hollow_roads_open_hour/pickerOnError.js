export default function onCancel(e) {

	this.setState({
		vehicle_hollow_roads_open_hour: {
			...this.state.vehicle_hollow_roads_open_hour,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};