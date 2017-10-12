export default function onPress() {

	!this.state.purchase_rivers_place_built.modalVisible && this.setState({
		purchase_rivers_place_built: {
			...this.state.purchase_rivers_place_built,
			modalVisible: true
		}
	});
};