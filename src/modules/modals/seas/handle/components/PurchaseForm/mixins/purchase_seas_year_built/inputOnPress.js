export default function onPress() {

	!this.state.purchase_seas_year_built.modalVisible && this.setState({
		purchase_seas_year_built: {
			...this.state.purchase_seas_year_built,
			modalVisible: true
		}
	});
};