export default function onPress() {

	!this.state.purchase_roads_place_delivery.modalVisible && this.setState({
		purchase_roads_place_delivery: {
			...this.state.purchase_roads_place_delivery,
			modalVisible: true
		}
	});
};