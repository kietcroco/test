export default function onPress() {

	!this.state.vehicle_rivers_code.modalVisible && this.setState({
		vehicle_rivers_code: {
			...this.state.vehicle_rivers_code,
			modalVisible: true
		}
	});
};