export default function onPress() {

	!this.state.vehicle_open_seas_vsl_type.modalVisible && this.setState({
		vehicle_open_seas_vsl_type: {
			...this.state.vehicle_open_seas_vsl_type,
			modalVisible: true
		}
	});
};