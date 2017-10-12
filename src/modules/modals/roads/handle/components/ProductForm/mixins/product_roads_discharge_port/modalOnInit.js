export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_roads_discharge_port: {
			...this.state.product_roads_discharge_port,
			label,
			value 
		}
	});
};