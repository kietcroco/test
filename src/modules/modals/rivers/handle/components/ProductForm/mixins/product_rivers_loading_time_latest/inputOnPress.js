export default function onPress() {

	!this.state.product_rivers_loading_time_latest.modalVisible && this.setState({
		product_rivers_loading_time_latest: {
			...this.state.product_rivers_loading_time_latest,
			modalVisible: true
		}
	});
};