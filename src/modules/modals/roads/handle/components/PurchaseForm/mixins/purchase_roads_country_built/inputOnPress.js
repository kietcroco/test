export default function onPress() {

	!this.state.purchase_roads_country_built.modalVisible && this.setState({
		purchase_roads_country_built: {
			...this.state.purchase_roads_country_built,
			modalVisible: true
		}
	});
};