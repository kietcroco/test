export default function onPress() {

	!this.state.vehicle_open_rivers_open_time.modalVisible && this.setState({
		vehicle_open_rivers_open_time: {
			...this.state.vehicle_open_rivers_open_time,
			modalVisible: true
		}
	});
};