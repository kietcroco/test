export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_seas_discharge_port: {
			...this.state.product_seas_discharge_port,
			label,
			value 
		}
	});
};