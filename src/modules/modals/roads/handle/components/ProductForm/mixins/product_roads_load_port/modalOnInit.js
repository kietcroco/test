export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_roads_load_port: {
			...this.state.product_roads_load_port,
			label,
			value 
		}
	});
};