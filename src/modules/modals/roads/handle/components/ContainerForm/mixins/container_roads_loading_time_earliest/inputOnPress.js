export default function onPress() {

	!this.state.container_roads_loading_time_earliest.modalVisible && this.setState({
		container_roads_loading_time_earliest: {
			...this.state.container_roads_loading_time_earliest,
			modalVisible: true
		}
	});
};