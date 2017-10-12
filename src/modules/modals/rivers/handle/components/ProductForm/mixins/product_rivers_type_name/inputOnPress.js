export default function onPress() {

	!this.state.product_rivers_type_name.modalVisible && this.setState({
		product_rivers_type_name: {
			...this.state.product_rivers_type_name,
			modalVisible: true
		}
	});
};