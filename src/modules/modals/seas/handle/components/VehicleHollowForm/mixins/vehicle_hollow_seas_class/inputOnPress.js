export default function onPress() {

	!this.state.vehicle_hollow_seas_class.modalVisible && this.setState({
		vehicle_hollow_seas_class: {
			...this.state.vehicle_hollow_seas_class,
			modalVisible: true
		}
	});
};