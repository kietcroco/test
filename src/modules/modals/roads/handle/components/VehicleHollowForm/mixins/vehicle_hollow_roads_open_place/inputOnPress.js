export default function onPress() {

	!this.state.vehicle_hollow_roads_open_place.modalVisible && this.setState({
		vehicle_hollow_roads_open_place: {
			...this.state.vehicle_hollow_roads_open_place,
			modalVisible: true
		}
	});
};