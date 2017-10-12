export default function onPress() {

	!this.state.product_rivers_weight_unit.modalVisible && this.setState({
		product_rivers_weight_unit: {
			...this.state.product_rivers_weight_unit,
			modalVisible: true
		}
	});
};