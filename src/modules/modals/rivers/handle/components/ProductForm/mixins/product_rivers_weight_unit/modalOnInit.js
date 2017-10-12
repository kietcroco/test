export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_weight_unit: {
			...this.state.product_rivers_weight_unit,
			label,
			value 
		}
	});
};