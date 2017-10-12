export default function onPress() {

	!this.state.purchase_seas_vehicle_type.modalVisible && this.setState({
		purchase_seas_vehicle_type: {
			...this.state.purchase_seas_vehicle_type,
			modalVisible: true
		}
	});
};