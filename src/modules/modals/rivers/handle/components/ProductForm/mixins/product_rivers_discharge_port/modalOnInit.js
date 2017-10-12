export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_rivers_discharge_port: {
			...this.state.product_rivers_discharge_port,
			label,
			value 
		}
	});
};