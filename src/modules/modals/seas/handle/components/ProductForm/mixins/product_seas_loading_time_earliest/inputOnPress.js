export default function onPress() {

	!this.state.product_seas_loading_time_earliest.modalVisible && this.setState({
		product_seas_loading_time_earliest: {
			...this.state.product_seas_loading_time_earliest,
			modalVisible: true
		}
	});
};