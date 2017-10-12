export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_seas_year_built: {
			...this.state.purchase_seas_year_built,
			label,
			value 
		}
	});
};