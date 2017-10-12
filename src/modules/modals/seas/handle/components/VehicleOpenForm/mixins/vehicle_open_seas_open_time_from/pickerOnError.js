export default function onCancel(e) {

	this.setState({
		vehicle_open_seas_open_time_from: {
			...this.state.vehicle_open_seas_open_time_from,
			modalVisible: false
		}
	});
	e && e.messase && alert(e.messase);
};