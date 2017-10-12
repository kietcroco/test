export default function onPress() {

	!this.state.purchase_roads_trademark.modalVisible && this.setState({
		purchase_roads_trademark: {
			...this.state.purchase_roads_trademark,
			modalVisible: true
		}
	});
};