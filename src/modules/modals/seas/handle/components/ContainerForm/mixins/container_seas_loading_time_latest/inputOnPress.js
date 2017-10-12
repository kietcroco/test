export default function onPress() {

	!this.state.container_seas_loading_time_latest.modalVisible && this.setState({
		container_seas_loading_time_latest: {
			...this.state.container_seas_loading_time_latest,
			modalVisible: true
		}
	});
};