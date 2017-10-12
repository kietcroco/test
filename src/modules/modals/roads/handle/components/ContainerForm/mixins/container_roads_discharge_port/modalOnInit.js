export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_roads_discharge_port: {
			...this.state.container_roads_discharge_port,
			label,
			value 
		}
	});
};