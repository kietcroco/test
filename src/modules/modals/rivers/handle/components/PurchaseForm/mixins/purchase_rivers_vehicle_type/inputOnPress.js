export default function onPress() {

	!this.state.purchase_rivers_vehicle_type.modalVisible && this.setState({
		purchase_rivers_vehicle_type: {
			...this.state.purchase_rivers_vehicle_type,
			modalVisible: true
		}
	});
};