export default function onPress() {

	!this.state.vehicle_rivers_type.modalVisible && this.setState({
		vehicle_rivers_type: {
			...this.state.vehicle_rivers_type,
			modalVisible: true
		}
	});
};