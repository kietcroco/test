export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		purchase_rivers_year_built: {
			...this.state.purchase_rivers_year_built,
			label,
			value 
		}
	});
};