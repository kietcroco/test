export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_load_port: {
			...this.state.product_rivers_load_port,
			label,
			value 
		}
	});
};