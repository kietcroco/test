export default function onPress() {

	!this.state.vehicle_hollow_rivers_want_discharge_place.modalVisible && this.setState({
		vehicle_hollow_rivers_want_discharge_place: {
			...this.state.vehicle_hollow_rivers_want_discharge_place,
			modalVisible: true
		}
	});
};