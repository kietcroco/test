export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_seas_load_port: {
			...this.state.container_seas_load_port,
			label,
			value 
		}
	});
};