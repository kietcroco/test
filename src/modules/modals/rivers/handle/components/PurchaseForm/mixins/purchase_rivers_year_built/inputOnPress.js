export default function onPress() {

	!this.state.purchase_rivers_year_built.modalVisible && this.setState({
		purchase_rivers_year_built: {
			...this.state.purchase_rivers_year_built,
			modalVisible: true
		}
	});
};