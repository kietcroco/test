export default function onPress() {

	!this.state.vehicle_open_seas_vsl_name.modalVisible && this.setState({
		vehicle_open_seas_vsl_name: {
			...this.state.vehicle_open_seas_vsl_name,
			modalVisible: true
		}
	});
};