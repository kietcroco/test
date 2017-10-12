export default function onPress() {

	!this.state.purchase_seas_country_built.modalVisible && this.setState({
		purchase_seas_country_built: {
			...this.state.purchase_seas_country_built,
			modalVisible: true
		}
	});
};