export default function onPress() {

	!this.state.product_seas_weight_unit.modalVisible && this.setState({
		product_seas_weight_unit: {
			...this.state.product_seas_weight_unit,
			modalVisible: true
		}
	});
};