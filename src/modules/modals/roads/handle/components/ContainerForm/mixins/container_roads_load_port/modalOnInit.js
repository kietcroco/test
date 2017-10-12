export default function modalOnInit(label: String = "", value: Array = []) {

	this.setState({
		container_roads_load_port: {
			...this.state.container_roads_load_port,
			label,
			value 
		}
	});
};