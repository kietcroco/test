export default function onPress() {

	!this.state.purchase_seas_place_built.modalVisible && this.setState({
		purchase_seas_place_built: {
			...this.state.purchase_seas_place_built,
			modalVisible: true
		}
	});
};