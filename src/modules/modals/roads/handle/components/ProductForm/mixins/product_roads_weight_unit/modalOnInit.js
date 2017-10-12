export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_roads_weight_unit: {
			...this.state.product_roads_weight_unit,
			label,
			value 
		}
	});
};