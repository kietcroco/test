export default function onPress() {

	!this.state.product_rivers_loading_time_earliest.modalVisible && this.setState({
		product_rivers_loading_time_earliest: {
			...this.state.product_rivers_loading_time_earliest,
			modalVisible: true
		}
	});
};