export default function onPress() {

	!this.state.vehicle_hollow_rivers_open_time.modalVisible && this.setState({
		vehicle_hollow_rivers_open_time: {
			...this.state.vehicle_hollow_rivers_open_time,
			modalVisible: true
		}
	});
};