export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_seas_discharge_port: {
			...this.state.container_seas_discharge_port,
			label,
			value 
		}
	});
};