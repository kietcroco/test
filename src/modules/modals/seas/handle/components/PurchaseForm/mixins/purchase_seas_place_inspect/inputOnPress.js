export default function onPress() {

	!this.state.purchase_seas_place_inspect.modalVisible && this.setState({
		purchase_seas_place_inspect: {
			...this.state.purchase_seas_place_inspect,
			modalVisible: true
		}
	});
};