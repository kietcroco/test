export default function onPress() {

	!this.state.vehicle_open_roads_open_place.modalVisible && this.setState({
		vehicle_open_roads_open_place: {
			...this.state.vehicle_open_roads_open_place,
			modalVisible: true
		}
	});
};