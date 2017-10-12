export default function onPress() {

	!this.state.purchase_roads_vehicle_type.modalVisible && this.setState({
		purchase_roads_vehicle_type: {
			...this.state.purchase_roads_vehicle_type,
			modalVisible: true
		}
	});
};