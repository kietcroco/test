export default function onPress() {

	!this.state.vehicle_hollow_roads_open_hour.modalVisible && this.setState({
		vehicle_hollow_roads_open_hour: {
			...this.state.vehicle_hollow_roads_open_hour,
			modalVisible: true
		}
	});
};