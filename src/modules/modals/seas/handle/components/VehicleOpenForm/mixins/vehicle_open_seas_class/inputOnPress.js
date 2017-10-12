export default function onPress() {

	!this.state.vehicle_open_seas_class.modalVisible && this.setState({
		vehicle_open_seas_class: {
			...this.state.vehicle_open_seas_class,
			modalVisible: true
		}
	});
};