export default function onPress() {

	!this.state.vehicle_hollow_seas_vsl_name.modalVisible && this.setState({
		vehicle_hollow_seas_vsl_name: {
			...this.state.vehicle_hollow_seas_vsl_name,
			modalVisible: true
		}
	});
};