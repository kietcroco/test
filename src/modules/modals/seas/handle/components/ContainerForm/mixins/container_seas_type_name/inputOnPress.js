export default function onPress() {

	!this.state.container_seas_type_name.modalVisible && this.setState({
		container_seas_type_name: {
			...this.state.container_seas_type_name,
			modalVisible: true
		}
	});
};