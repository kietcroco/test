export default function onPress() {

	!this.state.product_seas_loading_time_latest.modalVisible && this.setState({
		product_seas_loading_time_latest: {
			...this.state.product_seas_loading_time_latest,
			modalVisible: true
		}
	});
};