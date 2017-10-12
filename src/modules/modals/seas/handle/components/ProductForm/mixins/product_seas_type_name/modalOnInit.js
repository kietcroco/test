export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_seas_type_name: {
			...this.state.product_seas_type_name,
			label,
			value 
		}
	});
};