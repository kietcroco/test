export default function onCancel(e) {

	this.setState({
		vehicle_hollow_rivers_open_time: {
			...this.state.vehicle_hollow_rivers_open_time,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};