export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		product_seas_load_port: {
			...this.state.product_seas_load_port,
			label,
			value 
		}
	});
};