export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_roads_type_name: {
			...this.state.product_roads_type_name,
			label,
			value 
		}
	});
};