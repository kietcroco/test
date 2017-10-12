export default function onPress() {

	!this.state.product_seas_discharge_port.modalVisible && this.setState({
		product_seas_discharge_port: {
			...this.state.product_seas_discharge_port,
			modalVisible: true
		}
	});
};