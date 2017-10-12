export default function onPress() {

	!this.state.product_seas_type_name.modalVisible && this.setState({
		product_seas_type_name: {
			...this.state.product_seas_type_name,
			modalVisible: true
		}
	});
};