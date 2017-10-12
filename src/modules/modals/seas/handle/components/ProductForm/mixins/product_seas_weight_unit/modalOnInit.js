export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_seas_weight_unit: {
			...this.state.product_seas_weight_unit,
			label,
			value 
		}
	});
};