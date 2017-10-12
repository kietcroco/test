export default function onPress() {

	!this.state.product_rivers_discharge_port.modalVisible && this.setState({
		product_rivers_discharge_port: {
			...this.state.product_rivers_discharge_port,
			modalVisible: true
		}
	});
};