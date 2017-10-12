export default function onPress() {

	!this.state.purchase_rivers_place_delivery.modalVisible && this.setState({
		purchase_rivers_place_delivery: {
			...this.state.purchase_rivers_place_delivery,
			modalVisible: true
		}
	});
};