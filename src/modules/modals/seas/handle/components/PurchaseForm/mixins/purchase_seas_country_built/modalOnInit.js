export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_country_built: {
			...this.state.purchase_seas_country_built,
			label,
			value 
		}
	});
};