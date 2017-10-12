export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_type_name: {
			...this.state.product_rivers_type_name,
			label,
			value 
		}
	});
};