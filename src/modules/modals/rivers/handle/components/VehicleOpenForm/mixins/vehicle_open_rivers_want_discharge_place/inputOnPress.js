export default function onPress() {

	!this.state.vehicle_open_rivers_want_discharge_place.modalVisible && this.setState({
		vehicle_open_rivers_want_discharge_place: {
			...this.state.vehicle_open_rivers_want_discharge_place,
			modalVisible: true
		}
	});
};